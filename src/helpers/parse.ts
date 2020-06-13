import { Email } from './types';

const EMAIL_REGX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const isValidEmail = (string) => (
  EMAIL_REGX.test(string)
);

export const parseEmail = (value: string): Email => {
  // remove trailing comma or space
  const text = value.replace(/[, ]+/g, ' ').trim();
  return {
    text, 
    isValid: isValidEmail(text)
  };
};

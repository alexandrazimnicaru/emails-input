import { EmailsCounterComponent } from '../helpers/types';

const EmailsCounter = (): EmailsCounterComponent => {
  let validEmailsNo = 0;
  
  const getCountValidEmails = (): number => validEmailsNo;

  const increase = (isValid: boolean) => {
    if (!isValid) {
      return;
    }

    validEmailsNo++;
  };

  const decrease = (isValid: boolean) => {
    if (!isValid) {
      return;
    }

    validEmailsNo && validEmailsNo--;
  };

  return {
    getCountValidEmails,
    increase,
    decrease
  }
};

export default EmailsCounter;

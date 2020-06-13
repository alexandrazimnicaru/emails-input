import { parseEmail } from '../src/helpers/parse';

describe('Parser', function() {
  it('should parse an input value when it\'s a valid email address', function() {
    expect(parseEmail('email@email.com')).toEqual({ text: 'email@email.com', isValid: true });
    expect(parseEmail('email.email@email.email.com')).toEqual({ text: 'email.email@email.email.com', isValid: true });
    expect(parseEmail('email-_&+email@email-e.com')).toEqual({ text: 'email-_&+email@email-e.com', isValid: true });
  });

  it('should parse an input value when it isn\'s a valid email address', function() {
    expect(parseEmail('email')).toEqual({ text: 'email', isValid: false });
    expect(parseEmail('email@email')).toEqual({ text: 'email@email', isValid: false });
    expect(parseEmail('.email@email.com')).toEqual({ text: '.email@email.com', isValid: false });
    expect(parseEmail('email..email@email.com')).toEqual({ text: 'email..email@email.com', isValid: false });
  });

  it('should remove commas and spaces when parsing', function() {
    expect(parseEmail('email@email.com ')).toEqual({ text: 'email@email.com', isValid: true });
    expect(parseEmail('email@email.com ,')).toEqual({ text: 'email@email.com', isValid: true });
    expect(parseEmail('email@email.com, ')).toEqual({ text: 'email@email.com', isValid: true });
    expect(parseEmail('email@email, ')).toEqual({ text: 'email@email', isValid: false });
  });
});
    
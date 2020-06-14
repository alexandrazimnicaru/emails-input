import EmailsList from '../src/components/EmailsList';
import EmailsCounter from '../src/components/EmailsCounter';
import { mockInputEvent, mockInputPasteEvent } from './helpers';

let container;

beforeEach(() => {
  container = EmailsList(EmailsCounter()).render();
});

describe('Emails list', function() {
  it('should render an empty email list with an input field', function() {
    expect(container.querySelectorAll('[data-email]').length).toBeFalsy();
    
    const input = container.querySelector('input');
    expect(input).toBeTruthy();
    expect(input.placeholder).toEqual('add more people...');
  });

  it('should add an email to the list on input enter', function() {
    let emailBlocks;
    const input = container.querySelector('input');

    // add an email
    mockInputEvent(input, 'email@email.com', 'keyup', 13);

    // make sure there is one email with the right text value
    emailBlocks = container.querySelectorAll('[data-email]');
    expect(emailBlocks.length).toEqual(1);
    expect(emailBlocks[0].getAttribute('data-email')).toEqual('email@email.com');

    // add a second email
    mockInputEvent(input, 'email@email', 'keyup', 13);

    // make sure there are 2 emails with the right text values & in the right order
    emailBlocks = container.querySelectorAll('[data-email]');
    expect(emailBlocks.length).toEqual(2);
    expect(emailBlocks[0].getAttribute('data-email')).toEqual('email@email.com');
    expect(emailBlocks[1].getAttribute('data-email')).toEqual('email@email');
  });

  it('should add an email when typing a comma in the input', function() {
    let emailBlocks;
    const input = container.querySelector('input');

    // add an email
    mockInputEvent(input, 'email@email.com', 'keyup', 188);

    // make sure there is one email with the right text value
    emailBlocks = container.querySelectorAll('[data-email]');
    expect(emailBlocks.length).toEqual(1);
    expect(emailBlocks[0].getAttribute('data-email')).toEqual('email@email.com');

    // add a second email
    mockInputEvent(input, 'email@email', 'keyup', 188);

    // make sure there are 2 emails with the right text values & in the right order
    emailBlocks = container.querySelectorAll('[data-email]');
    expect(emailBlocks.length).toEqual(2);
    expect(emailBlocks[0].getAttribute('data-email')).toEqual('email@email.com');
    expect(emailBlocks[1].getAttribute('data-email')).toEqual('email@email');
  });

  it('should add an email on input blur', function() {
    let emailBlocks;
    const input = container.querySelector('input');

    // add an email
    mockInputEvent(input, 'email@email.com', 'blur');

    // make sure there is one email with the right text value
    emailBlocks = container.querySelectorAll('[data-email]');
    expect(emailBlocks.length).toEqual(1);
    expect(emailBlocks[0].getAttribute('data-email')).toEqual('email@email.com');

    // add a second email
    mockInputEvent(input, 'email@email', 'blur');

    // make sure there are 2 emails with the right text values & in the right order
    emailBlocks = container.querySelectorAll('[data-email]');
    expect(emailBlocks.length).toEqual(2);
    expect(emailBlocks[0].getAttribute('data-email')).toEqual('email@email.com');
    expect(emailBlocks[1].getAttribute('data-email')).toEqual('email@email');
  });

  it('should add a list of emails from comma separated pasted values', function() {
    let emailBlocks;
    const input = container.querySelector('input');

    // add 3 emails with different spacing options around the comma separated values
    mockInputPasteEvent(input, 'email@email.com, email ,email-email@email.com');

    // make sure there are 3 emails with the right text values & in the right order
    emailBlocks = container.querySelectorAll('[data-email]');
    expect(emailBlocks.length).toEqual(3);
    expect(emailBlocks[0].getAttribute('data-email')).toEqual('email@email.com');
    expect(emailBlocks[1].getAttribute('data-email')).toEqual('email');
    expect(emailBlocks[2].getAttribute('data-email')).toEqual('email-email@email.com');

    // add 2 more emails with a trailing comma
    mockInputPasteEvent(input, 'email1, email1-email@email.com, ');

    // make sure there are 5 emails with the right text values & in the right order
    emailBlocks = container.querySelectorAll('[data-email]');
    expect(emailBlocks.length).toEqual(5);
    expect(emailBlocks[3].getAttribute('data-email')).toEqual('email1');
    expect(emailBlocks[4].getAttribute('data-email')).toEqual('email1-email@email.com');
  });

  it('should remove an email', function() {
    let emailBlocks;
    const input = container.querySelector('input');

    // add 3 emails
    mockInputPasteEvent(input, 'email@email.com, email, email-email@email.com');
    emailBlocks = container.querySelectorAll('[data-email]');
    expect(emailBlocks.length).toEqual(3);

    // remove 1 email
    container.querySelector('[data-email="email"]').click();
  
    // make sure there are 2 emails left with the right text values
    emailBlocks = container.querySelectorAll('[data-email]');
    expect(emailBlocks.length).toEqual(2);
    expect(emailBlocks[0].getAttribute('data-email')).toEqual('email@email.com');
    expect(emailBlocks[1].getAttribute('data-email')).toEqual('email-email@email.com');
  });

  it('should differentiate valid and invalid emails', function() {
    let emailBlocks;
    const input = container.querySelector('input');

    // add 3 emails
    mockInputPasteEvent(input, 'email@email.com, email, email-email@email.com');
    emailBlocks = container.querySelectorAll('[data-email]');

    // make sure the valid emails have the is-valid class
    expect(emailBlocks[0].parentNode.classList.contains('is-valid')).toBeTruthy();
    expect(emailBlocks[2].parentNode.classList.contains('is-valid')).toBeTruthy();

    // make sure the invalid emails don't have the is-valid class
    expect(emailBlocks[1].parentNode.classList.contains('is-valid')).toBeFalsy();
  });
});
    
import { parseEmail } from '../helpers/parse';
import { Email, EmailList } from '../helpers/types';

const ENTER_KEY = 13;
const COMMA_KEY = 188;
const SVG = '<svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 0.8L7.2 0L4 3.2L0.8 0L0 0.8L3.2 4L0 7.2L0.8 8L4 4.8L7.2 8L8 7.2L4.8 4L8 0.8Z" fill="#050038"/></svg>'

const EmailsList = (): EmailList => {
  let validEmailsNo = 0;
  const listEl = document.createElement('ul');

  const getCountValidEmails = (): number => validEmailsNo;

  const getEmailBlock = ({ text, isValid }): HTMLElement => {
    const li = document.createElement('li');
    if (isValid) {
      li.classList.add('is-valid');
    }
    li.innerHTML = `${text} <button data-email="${text}" ${isValid ? 'data-valid="true"' : ''}><span class="sr-only">Remove email</span>${SVG}</button>`;
    return li;
  };

  const renderEmailBlock = (block) => {
    const lastBlock = listEl.childNodes.length - 1;
    listEl.insertBefore(block, listEl.childNodes[lastBlock]);
  };

  const renderMultipleEmailBlocks = (emails: Email[]) => {
    const fragment = document.createDocumentFragment();
  
    emails.forEach((email) => {
      if (!email.text) {
        return;
      }
      fragment.appendChild(getEmailBlock(email));
    })

    renderEmailBlock(fragment);
  };

  const remove = ({ target }) => {
    if (target.matches('button')) {
      const hasEmail = target.getAttribute('data-email');
      if (!hasEmail) {
        return;
      }

      if (target.getAttribute('data-valid')) {
        validEmailsNo && validEmailsNo--;
      }

      const emailElToRemove = target.parentNode;
      emailElToRemove.parentNode.removeChild(emailElToRemove);
    }
  };

  const add = (value: string): void => {
    const email = parseEmail(value);
    if (!email.text) {
      return;
    }

    if (email.isValid) {
      validEmailsNo++;
    }

    renderEmailBlock(getEmailBlock(email));
  };

  const addOnEvent = ({ target }) => {
    if (!target.value) {
      return;
    }

    add(target.value);
    (<HTMLInputElement>target).value = '';
  }

  const addOnKeyUp = (e: KeyboardEvent) => {
    const { keyCode, target } = e;
    if (!keyCode || !(<HTMLInputElement>target).value) {
      return;
    }

    if (keyCode === ENTER_KEY || keyCode === COMMA_KEY) {
      addOnEvent(e);
    }
  };

  const addOnPaste = (e: ClipboardEvent) => {
    // we don't actually want the data to be pasted in the input
    // since we're automatically transforming it into email blocks
    e.preventDefault();

    let pastedText;
    if (e.clipboardData && e.clipboardData.getData) {
      pastedText = e.clipboardData.getData('text/plain');
    } else if (window['clipboardData'] && window['clipboardData'].getData) {
      // get pasted text for browsers that don't support event clipboardData like IE11
      pastedText = window['clipboardData'].getData('Text');
    }

    if (!pastedText) {
      return;
    }
    const emails = pastedText.split(',').map((email) => {
      const parsed = parseEmail(email);
      if (parsed.isValid) {
        validEmailsNo++;
      }
      return parsed;
    });

    renderMultipleEmailBlocks(emails);
  };

  const renderInput = (): HTMLInputElement => {
    const input: HTMLInputElement = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'add more people...';
    input.autocomplete = 'off';
    input.spellcheck = false;
    input.autocapitalize = 'off';

    input.addEventListener('keyup', addOnKeyUp);
    input.addEventListener('blur', addOnEvent);
    input.addEventListener('paste', addOnPaste);

    return input;
  }

  const render = (): HTMLElement => {   
    // add email blocks list with event listener
    listEl.addEventListener('click', remove);
    listEl.appendChild(renderInput());

    return listEl;
  };

  return {
    add,
    getCountValidEmails,
    render
  }
};

export default EmailsList;

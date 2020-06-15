import { parseEmail } from '../helpers/parse';
import { Email, EmailListComponent, EmailsCounterComponent } from '../helpers/types';
import { CSS_PREFIX } from '../helpers/constants';

const ENTER_KEY = 13;
const COMMA_KEY = 188;
const SVG = '<svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 0.8L7.2 0L4 3.2L0.8 0L0 0.8L3.2 4L0 7.2L0.8 8L4 4.8L7.2 8L8 7.2L4.8 4L8 0.8Z" fill="#050038"/></svg>'
const REMOVE_TITLE = `<span class="sr-only">Remove email</span>`;

// cover IE11 lack of support for target.matches
const matchesEl = (target, el) => target.matches ? target.matches(el) : target.msMatchesSelector(el);

const EmailsList = (counter: EmailsCounterComponent): EmailListComponent => {
  const listEl = document.createElement('ul');

  const getEmailBlock = ({ text, isValid }): HTMLElement => {
    const li = document.createElement('li');
    li.classList.add(`${CSS_PREFIX}__block`);

    if (isValid) {
      li.classList.add('is-valid');
    }

    // turn input value into text node & filter any html tags just in case html is pasted
    const textEl = document.createTextNode(text);
    const dataEmail = text.replace(/(<([^>]+)>)/ig, '');
    li.appendChild(textEl);

    // add remove button with data email & data valid (if valid)
    // data-email is used to trigger the remove action when the click target is the button
    // data-valid is used to determine on removal whether the counter of valid emails should be decreased
    li.innerHTML += `<button class="${CSS_PREFIX}__btn ${CSS_PREFIX}__btn--block" data-email="${dataEmail || false}" ${isValid ? 'data-valid="true"' : ''}>
        ${REMOVE_TITLE} ${SVG}
      </button>`;
    return li;
  };

  const renderEmailBlock = (block) => {
    // get the last list element which is always the input, to insert blocks before it
    const lastBlock = listEl.childNodes.length - 1;
    listEl.insertBefore(block, listEl.childNodes[lastBlock]);
  };

  const renderMultipleEmailBlocks = (emails: Email[]) => {
    const fragment = document.createDocumentFragment();
  
    emails.forEach((email) => {
      if (!email.text) {
        return;
      }

      counter.increase(email.isValid);

      fragment.appendChild(getEmailBlock(email));
    })

    renderEmailBlock(fragment);
  };

  const remove = ({ target }) => {
    // trigger the removal only for remove buttons targets, identified by data-email
    if (matchesEl(target, 'button')) {
      const hasEmail = target.getAttribute('data-email');
      if (!hasEmail) {
        return;
      }

      // use data-valid set on block rendering to update the validEmailsNo
      counter.decrease(target.getAttribute('data-valid'));

      // remove block
      const emailElToRemove = target.parentNode;
      emailElToRemove.parentNode.removeChild(emailElToRemove);
    }
  };

  const add = (value: string): void => {
    const email = parseEmail(value);
    if (!email.text) {
      return;
    }

    counter.increase(email.isValid);

    renderEmailBlock(getEmailBlock(email));
  };

  const addOnEvent = ({ target }) => {
    if (!target.value) {
      return;
    }

    add(target.value);
    // clear input after adding it
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

    // parse and render multiple emails at once as it's more efficient
    const emails = pastedText.split(',').map((email) => parseEmail(email));
    renderMultipleEmailBlocks(emails);
  };

  const renderInput = (): HTMLInputElement => {
    const input: HTMLInputElement = document.createElement('input');
    input.classList.add(`${CSS_PREFIX}__input`);

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
    listEl.classList.add(`${CSS_PREFIX}__list`);

    // add remove listener on entire list to avoid separate listeners on each item
    listEl.addEventListener('click', remove);

    // add input as list element, all email blocks will be inserted before it
    const li = document.createElement('li');
    li.classList.add(`${CSS_PREFIX}__input-item`)
    li.appendChild(renderInput());
    listEl.appendChild(li);

    return listEl;
  };

  return {
    add,
    render
  }
};

export default EmailsList;

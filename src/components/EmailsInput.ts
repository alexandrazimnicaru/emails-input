import EmailsList from './EmailsList';
import EmailsCounter from './EmailsCounter';
import { EmailListComponent, EmailsCounterComponent } from '../helpers/types';
import { CSS_PREFIX } from '../helpers/constants';

const EmailsInput = (container: HTMLElement): HTMLElement => {
  const counter: EmailsCounterComponent = EmailsCounter();
  const emailList: EmailListComponent = EmailsList(counter);

  const addRandom = () => {
    emailList.add(`email_${Date.now()}@email.com`);
  };

  const alertCount = () => {
    const count = counter.getCountValidEmails();
    const message = count === 1 ? `There is currently 1 valid email` : `There are currently ${count} valid emails`;
    alert(message);
  };

  const renderBtnWithListener = (title: string, listener: VoidFunction, classModifier = ''): HTMLElement => {
    const btn = document.createElement('button');
  
    if (title) {
      btn.innerHTML = title;
    }

    btn.classList.add(`${CSS_PREFIX}__btn`);
    if (classModifier) {
      btn.classList.add(`${CSS_PREFIX}__btn--${classModifier}`);
    }
  
    if (listener && typeof listener === 'function') {
      btn.addEventListener('click', listener);
    }
  
    return btn;
  };

  const renderHeader = (): HTMLElement => {
    const header = document.createElement('header');
    header.classList.add(`${CSS_PREFIX}__header`);

    header.innerHTML = `<h1 class="${CSS_PREFIX}__title">Share <strong>Board name</strong> with others</h1>`;

    return header;
  };

  const renderFooter = (): HTMLElement => {
    const footer = document.createElement('footer');
    footer.classList.add(`${CSS_PREFIX}__footer`);

    // add buttons for adding random email & getting the valid email count
    footer.appendChild(renderBtnWithListener('Add email', addRandom, 'add'));
    footer.appendChild(renderBtnWithListener('Get emails count', alertCount, 'count'));

    return footer;
  };

  const render = () => {
    const fragment = document.createDocumentFragment();
    const article = document.createElement('article');
    article.classList.add(CSS_PREFIX);

    // add header
    article.appendChild(renderHeader());

    // add main with email list component
    const main = document.createElement('main');
    main.classList.add(`${CSS_PREFIX}__main`);
    main.appendChild(emailList.render());
    article.appendChild(main);

    // add footer
    article.appendChild(renderFooter());

    // add to DOM
    fragment.appendChild(article);
    container.appendChild(fragment);
  };

  // initialize component by rendering it 
  render();

  // return original container with component in case it's needed for external manipulations
  return container;
};

export default EmailsInput;

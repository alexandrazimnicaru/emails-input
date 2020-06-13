import EmailsList from './EmailsList';
import { EmailList } from '../helpers/types';

const EmailsInput = (container: HTMLElement): HTMLElement => {
  const emailList: EmailList = EmailsList();

  const addRandom = () => {
    emailList.add(`email_${Date.now()}@email.com`);
  };

  const alertCount = () => {
    const count = emailList.getCountValidEmails();
    const message = count === 1 ? `There is currently 1 valid email` : `There are currently ${count} valid emails`;
    alert(message);
  };

  const renderBtnWithListener = (title: string, listener: VoidFunction): HTMLElement => {
    const btn = document.createElement('button');
  
    if (title) {
      btn.innerHTML = title;
    }
  
    if (listener && typeof listener === 'function') {
      btn.addEventListener('click', listener);
    }
  
    return btn;
  };

  const renderHeader = (): HTMLElement => {
    const header = document.createElement('header');
    header.innerHTML = '<h1>Share <strong>Board name</strong> with others</h1>';
    return header;
  };

  const renderFooter = (): HTMLElement => {
    const footer = document.createElement('footer');
    footer.appendChild(renderBtnWithListener('Add email', addRandom));
    footer.appendChild(renderBtnWithListener('Get emails count', alertCount));
    return footer;
  };

  const render = () => {
    const fragment = document.createDocumentFragment();
    const article = document.createElement('article');
    article.classList.add('emails-input-lib');

    article.appendChild(renderHeader());
    article.appendChild(emailList.render());
    article.appendChild(renderFooter());

    fragment.appendChild(article);
    container.appendChild(fragment);
  };

  render();

  return container;
};

export default EmailsInput;

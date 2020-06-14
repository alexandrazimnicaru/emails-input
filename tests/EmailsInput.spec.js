import EmailsInput from '../src/components/EmailsInput';
import { mockInputEvent } from './helpers';

describe('Emails input', function() {
  let dummyElement;
  let container;

  beforeEach(() => {
    dummyElement = document.createElement('div');
    container = EmailsInput(dummyElement);
  });

  it('should render the correct title, email list, an add and count buttons', function() {
    expect(container.innerHTML.indexOf('Share <strong>Board name</strong> with others')).not.toEqual(-1);

    const emailList = container.querySelector('ul');
    expect(emailList).toBeTruthy();

    const btns = container.querySelectorAll('button');
    expect(btns.length).toEqual(2);
    expect(btns[0].innerHTML).toEqual('Add email');
    expect(btns[1].innerHTML).toEqual('Get emails count');
  });

  it('should add a random email when clicing the add button', function() {
    const addEmailBtn = container.querySelectorAll('button')[0];
    addEmailBtn.click();
  
    const emailList = container.querySelector('ul');
    const emailBlocks = emailList.querySelectorAll('[data-email]');
    const validEmailBlocks = emailList.querySelectorAll('[data-valid]');
    expect(emailBlocks.length).toEqual(1);
    expect(validEmailBlocks.length).toEqual(1);
  });

  it('should show the number of valid emailswhen clicking the get count button', function() {
    spyOn(window, 'alert');
    const getCountBtn = container.querySelectorAll('button')[1];
    const input = container.querySelector('input');
  
    getCountBtn.click();
    expect(window.alert).toHaveBeenCalledWith(`There are currently 0 valid emails`);
  
    mockInputEvent(input, 'email@email.com', 'keyup', 13);
    getCountBtn.click();
    expect(window.alert).toHaveBeenCalledWith(`There is currently 1 valid email`);
  
    mockInputEvent(input, 'email@email', 'keyup', 13);
    getCountBtn.click();
    expect(window.alert).toHaveBeenCalledWith(`There is currently 1 valid email`);
  
    const removeBtn = container.querySelector('[data-email="email@email.com"]');
    removeBtn.click();
    expect(window.alert).toHaveBeenCalledWith(`There are currently 0 valid emails`);
  });
});

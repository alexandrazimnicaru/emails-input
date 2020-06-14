import EmailsCounter from '../src/components/EmailsCounter';

describe('Emails counter', function() {
  let counter;

  beforeEach(() => {
    counter = EmailsCounter();
  });

  it('should initialize with 0 valid emails', function() {
    expect(counter.getCountValidEmails()).toEqual(0);
  });

  it('should increase the number of valid emails', function() {
    counter.increase(true);
    expect(counter.getCountValidEmails()).toEqual(1);

    // it shouldn't increase if an email is invalid
    counter.increase(false);
    expect(counter.getCountValidEmails()).toEqual(1);

    counter.increase(true);
    expect(counter.getCountValidEmails()).toEqual(2);
  });

  it('should decrease the number of valid emails', function() {
    // start with 2 valid emails
    counter.increase(true);
    counter.increase(true);

    counter.decrease(true);
    expect(counter.getCountValidEmails()).toEqual(1);

    // it shouldn't decrease if an email is invalid
    counter.decrease(false);
    expect(counter.getCountValidEmails()).toEqual(1);

    counter.decrease(true);
    expect(counter.getCountValidEmails()).toEqual(0);

    // it shouldn't go lower than 0
    counter.decrease(true);
    expect(counter.getCountValidEmails()).toEqual(0);
  });
});
    
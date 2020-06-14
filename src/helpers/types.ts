export interface Email {
  text: string;
  isValid: boolean;
}

export interface EmailListComponent {
  add(value: string): void;
  render(): HTMLElement;
}

export interface EmailsCounterComponent {
  getCountValidEmails(): number;
  increase(isValid: boolean): void;
  decrease(isValid: boolean): void;
}

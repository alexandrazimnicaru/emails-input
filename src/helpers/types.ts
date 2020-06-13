export interface Email {
  text: string;
  isValid: boolean;
}

export interface EmailList {
  add(value: string): void;
  getCountValidEmails(): number;
  render(): HTMLElement;
}

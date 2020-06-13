export const mockInputEvent = (input, value, type, keyCode = '') => {
  const event = new Event(type);

  if (keyCode) {
    event.keyCode = keyCode;
  }

  input.value = value;
  input.dispatchEvent(event);
};

export const mockInputPasteEvent = (input, value) => {
  const pasteData = new DataTransfer();
  pasteData.setData('text/plain', value);

  const event = new ClipboardEvent('paste', {
    clipboardData: pasteData
  });

  input.dispatchEvent(event);
};

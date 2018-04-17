const inputCleaner = (string) => {
  return string.toLowerCase().split(' ').join('_');
};

export {
  inputCleaner
};
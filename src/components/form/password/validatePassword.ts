const validatePassword = (value: string) => {
  if (/\s/.test(value)) {
    return 'Password should not contain spaces';
  }
  if (/[а-яА-Я]/.test(value)) {
    return 'Password should not contain cirrillic';
  }
  if (/(?=.*[^a-zA-Z0-9])/.test(value)) {
    return 'Password should contain only latin`s letters and number';
  }
  if (!value.match(/(?=.*[A-Z])/)) {
    return 'Should contain 1 uppercase letter at least';
  }
  if (!value.match(/(?=.*[a-z])/)) {
    return 'Should contain 1 lowercase letter at least';
  }
  if (!value.match(/(?=.*[0-9])/)) {
    return 'Should contain a number';
  }
  return true;
};

export default validatePassword;

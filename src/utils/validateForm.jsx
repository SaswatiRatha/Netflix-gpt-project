export const checkValidation = (email, password) => {
  const error = {};
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password,
    );

  if (!isEmailValid) {
    error.email = "Please enter a valid email address.";
  }
  if (!isPasswordValid) {
    error.password =
      "Password must contain at least 8 characters, including uppercase, lowercase, a number, and a special character.";
  }
  return Object.keys(error).length === 0 ? null : error;
};

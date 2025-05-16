//password balidaton

//confirm password

//confirm username

//for production

/*const validatePassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return passwordRegex.test(password);
}*/

const confirmPassword = (
  password: string,
  confirmPassword: string
): boolean => {
  return password === confirmPassword;
};

export default { confirmPassword };


//confirm password

//confirm username

//for production

//protecte routes


const confirmPassword = (
 passwordObj: { password: string; confirmPass: string }
): boolean => {
  return passwordObj.password === passwordObj.confirmPass;
};



export { confirmPassword };

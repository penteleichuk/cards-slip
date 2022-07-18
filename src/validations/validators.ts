const emailRegExp = /^[\w][\w-.]*@[\w-]+\.[a-z]{2,7}$/i;

export const emailValidator = (email: string): boolean => emailRegExp.test(email);
export const passwordValidator = (password: string): boolean => password.length > 7;

import type { LoginFormErrors } from "./types";

export const validateLoginForm = (email: string, password: string) => {
    const errors: LoginFormErrors = {};
    if (!email) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email address is invalid';
    }
    if (!password) {
      errors.password = 'Password is required';
    }
  
    return errors;
  };
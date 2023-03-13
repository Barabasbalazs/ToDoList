import { User } from "../models/user-model";

const validateEmail = (email: string) => {
  const regex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
  return regex.exec(email);
}

export const isEmptyInput = (user: User) => {
  return (!user.email || !user.password);
}

export const isUserValid = (user: User) => {
  if (isEmptyInput(user)) {
    return false;
  }
  const result = validateEmail(user.email);
  return result;
}
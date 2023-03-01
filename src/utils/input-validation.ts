import { User } from "../models/user-model";

export function isEmptyInput(user: User) {
  if (user.email === '' || user.password === '') {
    return true;
  }
  return false;
}

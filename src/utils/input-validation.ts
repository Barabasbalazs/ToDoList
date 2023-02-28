import { User } from "../types/user";

export function isEmptyInput(user: User) {
  if (user.email === '' || user.password === '') {
    return true;
  }
  return false;
}

import { User } from "../models/user-model";

export function isEmptyInput(user: User) {
  return (!user.email || !user.password);
}

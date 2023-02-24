import { User } from "./user";

export interface Authentication {
    user: User;
    authToken: string;
}
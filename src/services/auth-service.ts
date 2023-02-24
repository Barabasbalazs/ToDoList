import { Authentication } from '../types/authentication';
import envVariables from '../config/env-variables';

const authUrl = envVariables.authUrl;

export const authService = {
  login: async (
    email: string,
    password: string
  ): Promise<Authentication | void> => {
    try {
      const response = await fetch(`${authUrl}/login`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      if (response) {
        return response.body as Authentication;
      }
    } catch (e) {
        console.log(e);
    }
  },
};

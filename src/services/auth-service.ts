import envVariables from '../config/env-variables';
import { User } from '../types/user';

const authUrl = envVariables.authUrl();

export const authService = {
  login: async (email: string, password: string) => {
    const resp = await fetch(`${authUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const response = await resp.json();
    if (response.status === 401) {
      return false;
    }
    return response;
  },
  register: async(user: User) => {
    const resp = await fetch(`${authUrl}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const response = await resp.json();
    if (response.status === 401) {
      return false;
    }
    return response;
  }
};

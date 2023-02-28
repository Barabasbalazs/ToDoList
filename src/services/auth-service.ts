import envVariables from '../config/env-variables';

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
};

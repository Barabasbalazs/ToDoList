import envVariables from '../config/env-variables';
import { User } from '../models/user-model';
import { handleRequest, handleResponse } from '../utils/fetch-requests';

const authUrl = envVariables.authUrl();

export const authService = {
  login: async (email: string, password: string) => {
    const user = {
      email,
      password,
    };
    const resp = await handleRequest(`${authUrl}/login`, 'POST', '', user);
    return await handleResponse(resp);
  },
  register: async (user: User) => {
    const resp = await handleRequest(`${authUrl}/register`, 'POST', '', user);
    return await handleResponse(resp);
  },
  logout: async (authToken: string) => {
    const resp = await handleRequest(`${authUrl}/logout`, 'POST', authToken);
    return await handleResponse(resp);
  },
};

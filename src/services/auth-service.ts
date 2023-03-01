import envVariables from '../config/env-variables';
import { User } from '../models/user-model';
import { fetchReq } from '../utils/fetch-requests';

const authUrl = envVariables.authUrl();

export const authService = {
  login: async (email: string, password: string) => {
    const resp = await fetchReq(`${authUrl}/login`,'POST', '', { email, password});
    if (resp.status !== 200) {
      return false;
    }
    const response = await resp.json();
    return response;
  },
  register: async(user: User) => {
    const resp = await fetchReq(`${authUrl}/register`, 'POST', '', user);
    if (resp.status !== 200) {
      return false;
    }
    const response = await resp.json();
    return response;
  },
  logout: async(authToken: string) => {
    const resp = await fetchReq(`${authUrl}/logout`, 'POST', authToken);
    if (resp.status !== 200) {
      return false;
    }
    const response = await resp.json();
    return response;
  }
};

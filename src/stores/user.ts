import { defineStore } from 'pinia';
import { User } from '../types/user';
import { authService } from '../services/auth-service';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {} as User,
    authToken: '' as string,
  }),
  actions: {
    async login(user: User) {
      const response = await authService.login(user.email, user.password);
      if (response) {
        this.user = response.user;
        this.authToken = response.authToken;
        return true;
      }
      return false;
    },
    async logout() {},
    async register() {},
  },
  persist: {
    enabled: true,
  }
});

import { defineStore } from 'pinia';
import { User } from '../types/user';
import { authService } from '../services/auth-service';

export const useAuthStore = defineStore('authentication', {
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
    async logout() {
      const resp = await authService.logout(this.authToken);
      this.user = {} as User;
      this.authToken = '';
      if (resp.status !== 200) {
        return false;
      }
      return true;
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'auth',
        storage: localStorage
      }
    ]
  }
});

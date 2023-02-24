import { defineStore } from 'pinia';
import { User } from '../types/user';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: {} as User,
        authToken : '' as string
    }),
    actions: {
        async login() {

        },
        async logout() {

        }, 
        async register() {
            
        }
    }
});
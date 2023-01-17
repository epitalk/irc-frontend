import { defineStore } from 'pinia';

export const useUserStore = defineStore('appStore', {
    state: () => ({
        user: {
            username: null
        }
    }),
    actions: {
        setUsername(username: string) {
            this.user.username = username;
        }
    }
});

import { defineStore } from 'pinia';
import type { UserStore } from "@/types/user";

const userInLocalStorage = localStorage.getItem('user')

export const useUserStore = defineStore('userStore', {
    state: () => ({
        user: userInLocalStorage ? JSON.parse(userInLocalStorage) : undefined as (UserStore | undefined)
    }),
    actions: {
        setUsername(username: string | undefined) {
            if(!username){
                return
            }
            if(!this.user){
                this.user = {}
            }
            this.user.username = username;
            localStorage.setItem('user', JSON.stringify(this.user));
        }
    }
});

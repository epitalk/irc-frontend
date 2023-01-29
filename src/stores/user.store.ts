import { defineStore } from "pinia";
import type { UserModel } from "@/api/user/user.model";
import router from "@/router";

const userInLocalStorage = localStorage.getItem("user");

export const useUserStore = defineStore("userStore", {
  state: () => ({
    users: [] as UserModel[],
    user: userInLocalStorage ? JSON.parse(userInLocalStorage) : {} as UserModel | {}
  }),
  actions: {
    async logout() {
      this.setUser({})
      await router.push('/welcome')
    },
    setUsers(users: UserModel[]) {
      this.users = users;
    },
    setUser(user: UserModel | {}) {
      this.user = user;
      localStorage.setItem("user", JSON.stringify(this.user));
    },
    setUsername(username: string | undefined) {
      if (!username) {
        return;
      }
      this.user.username = username;
      this.setUser(this.user)
    }
  }
});

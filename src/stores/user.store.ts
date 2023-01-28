import { defineStore } from "pinia";
import type { UserModel } from "@/api/user/user.model";

const userInLocalStorage = localStorage.getItem("user");

export const useUserStore = defineStore("userStore", {
  state: () => ({
    user: userInLocalStorage ? JSON.parse(userInLocalStorage) : {} as UserModel | {}
  }),
  actions: {
    setUser(user: UserModel) {
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

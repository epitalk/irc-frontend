import { defineStore } from "pinia";
import type { UserModel } from "@/api/user/user.model";
import router from "@/router";
import type { MessageCommand } from "@/api/message/message.model";

const userInLocalStorage = localStorage.getItem("user");

export interface usersWithMessage extends UserModel {
  messages: MessageCommand[]
}

export const useUserStore = defineStore("userStore", {
  state: () => ({
    usersWithMessage: [] as usersWithMessage[],
    user: userInLocalStorage ? JSON.parse(userInLocalStorage) : {} as UserModel | {}
  }),
  actions: {
    async logout() {
      this.setUser({})
      await router.push('/welcome')
    },
    addMessageInUserWithMessage(message: MessageCommand, receiver: string){
      let user = this.usersWithMessage.find(u => u.username === receiver)
      if (!user){
        user = {
          created_at: "", id: 0, messages: [], updated_at: "",
          username: receiver
        }
        this.usersWithMessage.unshift(user)
      }
      const messages = user?.messages

      if (messages){
        messages.push(message)
        this.usersWithMessage.sort(function(x,y){ return x == user ? -1 : y == user ? 1 : 0; });
      }
    },
    setUsersWithMessage(users: usersWithMessage[]) {
      this.usersWithMessage = users;
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

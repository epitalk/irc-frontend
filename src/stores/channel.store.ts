import { defineStore } from "pinia";
import type { Messages } from "@/types/message";
import { SITE_NAME } from "@/utils/env";
import type { ChannelModel } from "@/api/channel/channel.model";
import router from "@/router";
import type { UserModel } from "@/api/user/user.model";


export const useChannelStore = defineStore("channelStore", {
  state: () => ({
    channels: [] as ChannelModel[],
    messages: {
      "general": []
    } as Messages,
    currentChannel: ""
  }),
  actions: {
    addUserChannel(channelName: string, user: UserModel){
      const channel = this.channels.find(c => c.name === channelName)
      const userIsInChannel = channel?.users.find(u => u.id === user.id)
      if (channel && !userIsInChannel){
        channel.users.push(user)
      }
    },
    removeUserChannel(channelName: string, user: UserModel){
      const channel = this.channels.find(c => c.name === channelName)
      if (channel){
        channel.users = channel.users.filter(u => u.id !== user.id)
      }
    },
    setChannels(channels: ChannelModel[]) {
      this.channels = channels;
    },
    setCurrentChannel(channel: string) {
      this.currentChannel = channel;
    },
    addChannel(channel: ChannelModel) {
      const channelAlreadyExist = this.channels.find(c => c.name === channel.name)
      if (!channelAlreadyExist){
        this.channels.push(channel);
      }
    },
    async deleteChannel(channel: string) {
      this.channels = this.channels.filter(c => c.name !== channel);
      if (channel === this.currentChannel) {
        await router.push('/channel/general')
      }
    },
    addBotMessage(content: string, ...args: any[]) {
      if (!this.messages[this.currentChannel]){
        this.messages[this.currentChannel] = []
      }
      this.messages[this.currentChannel].push({ username: SITE_NAME, content, ...args });
    }
  }
});

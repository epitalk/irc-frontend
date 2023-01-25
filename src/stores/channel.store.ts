import { defineStore } from "pinia";
import type { Messages } from "@/types/message";
import { SITE_NAME } from "@/utils/env";
import type { ChannelModel } from "@/api/channel/channel.model";

export const useChannelStore = defineStore("channelStore", {
  state: () => ({
    channels: [] as ChannelModel[],
    messages: {
      "general": []
    } as Messages,
    currentChannel: ""
  }),
  actions: {
    setChannels(channels: ChannelModel[]) {
      this.channels = channels;
    },
    setCurrentChannel(channel: string) {
      this.currentChannel = channel;
    },
    addChannel(channel: ChannelModel) {
      this.channels.push(channel);
    },
    deleteChannel(channel: string) {
      this.channels = this.channels.filter(c => c.name !== channel);
      if (channel === this.currentChannel) {
        this.currentChannel = "general";
      }
    },
    addBotMessage(content: string) {
      //@ts-ignore
      this.messages[this.currentChannel].push({ username: SITE_NAME, content });
    }
  }
});

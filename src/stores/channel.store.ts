import { defineStore } from 'pinia';
import type { Messages } from "@/types/message";

export const useChannelStore = defineStore('channelStore', {
    state: () => ({
        channels: [] as string[],
        messages: {} as Messages,
        currentChannel: ''
    }),
    actions: {
        setChannels(channels: string[]) {
            this.channels = channels
        },
        setCurrentChannel(channel: string) {
            this.currentChannel = channel
        },
        addChannel(channel: string) {
            this.channels.push(channel)
        }
    }
});

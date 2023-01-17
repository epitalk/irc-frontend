import { defineStore } from 'pinia';

export const useChannelStore = defineStore('channelStore', {
    state: () => ({
        channels: [] as string[],
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

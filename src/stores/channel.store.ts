import { defineStore } from 'pinia';
import type { Messages } from "@/types/message";
import { SITE_NAME } from "@/utils/env";

export const useChannelStore = defineStore('channelStore', {
    state: () => ({
        channels: [] as string[],
        messages: {
            "general": []
        } as Messages,
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
        },
        addBotMessage(content: string){
            //@ts-ignore
            this.messages[this.currentChannel].push({username: SITE_NAME, content})
        }
    }
});

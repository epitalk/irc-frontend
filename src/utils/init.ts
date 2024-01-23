import { ChannelApi } from "@/api/channel/channel";
import { useChannelStore } from "@/stores/channel.store";
import { useAppStore } from "@/stores/app.store";
import { SseService } from "@/services/SseService";
import type { ChannelModel } from "@/api/channel/channel.model";
import { useUserStore } from "@/stores/user.store";
import { MessageApi } from "@/api/message/message";

const getChannels = async () => {
    await ChannelApi.getChannels().then(async (res) => {
        useChannelStore().setChannels(res.data)
        initChannelMessages(res.data)
    }).catch(err => {
        console.log(err);
    })
}

const getUsersWithMessage = async () => {
    await MessageApi.getUsersWithMessage(useUserStore().user.id).then(async (res) => {
        useUserStore().setUsersWithMessage(res.data)
    }).catch(err => {
        console.log(err);
    })
}

const initChannelMessages = (channels: ChannelModel[]) => {
    channels.map(channel => {
        if (channel.messages?.length) {
            channel.messages.map(message => message.username = message.user.username);
            useChannelStore().messages[channel.name] = channel.messages
        }
    })
}


export const initApplication = async () => {
    useAppStore().setPending(true)
    await getChannels()
    await getUsersWithMessage()
    await SseService.initSseChannels()
    useAppStore().setPending(false)
}

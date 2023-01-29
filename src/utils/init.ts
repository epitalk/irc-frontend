import { ChannelApi } from "@/api/channel/channel";
import { useChannelStore } from "@/stores/channel.store";
import { useAppStore } from "@/stores/app.store";
import { SseService } from "@/services/SseService";
import type { ChannelModel } from "@/api/channel/channel.model";
import { useUserStore } from "@/stores/user.store";
import { MessageApi } from "@/api/message/message";

/*STORES*/
const channelStore = useChannelStore()
const userStore = useUserStore()
const appStore = useAppStore()

const getChannels = async () => {
  await ChannelApi.getChannels().then(async (res) => {
    channelStore.setChannels(res.data)
    initChannelMessages(res.data)
  }).catch(err => {
    console.log(err);
  })
}

const getUsersWithMessage = async () => {
  await MessageApi.getUsersWithMessage(userStore.user.id).then(async (res) => {
    userStore.setUsersWithMessage(res.data)
  }).catch(err => {
    console.log(err);
  })
}

const initChannelMessages = (channels: ChannelModel[]) => {
    channels.map(channel => {
        if (channel.messages?.length){
            channel.messages.map(message => message.username = message.user.username);
            channelStore.messages[channel.name] = channel.messages
        }
    })
}


export const initApplication = async () => {
  appStore.setPending(true)
  await getChannels()
  await getUsersWithMessage()
  await SseService.initSseChannels()
  appStore.setPending(false)
}

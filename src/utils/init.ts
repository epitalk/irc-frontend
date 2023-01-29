import { ChannelApi } from "@/api/channel/channel";
import { useChannelStore } from "@/stores/channel.store";
import { useAppStore } from "@/stores/app.store";
import { SseService } from "@/services/SseService";
import type { ChannelModel } from "@/api/channel/channel.model";
import { UserApi } from "@/api/user/user";
import { useUserStore } from "@/stores/user.store";

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

const getUsers = async () => {
  await UserApi.all().then(async (res) => {
    userStore.setUsers(res.data)
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
  await getUsers()
  await SseService.initSseChannels()
  appStore.setPending(false)
}

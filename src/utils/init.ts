import { ChannelApi } from "@/api/channel/channel";
import { useChannelStore } from "@/stores/channel.store";
import { useAppStore } from "@/stores/app.store";
import { SseService } from "@/services/SseService";
import type { ChannelModel } from "@/api/channel/channel.model";

/*STORES*/
const channelStore = useChannelStore()
const appStore = useAppStore()

const getChannels = async () => {
  appStore.setPending(true)
  await ChannelApi.getChannels().then(async (res) => {
    channelStore.setChannels(res.data)
    initChannelMessages(res.data)
  }).catch(err => {
    console.log(err);
  })
  appStore.setPending(false)
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
  await getChannels()
  SseService.initSseChannels()
}

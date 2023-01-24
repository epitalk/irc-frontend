import { ChannelApi } from "@/api/channel/channel";
import { useChannelStore } from "@/stores/channel.store";
import { useAppStore } from "@/stores/app.store";
import { SseService } from "@/services/SseService";

/*STORES*/
const channelStore = useChannelStore()
const appStore = useAppStore()

const getChannels = async () => {
  appStore.setPending(true)
  await ChannelApi.getChannels().then((res) => {
    channelStore.setChannels(res.data)
  }).catch(err => {
    console.log(err);
  })
  appStore.setPending(false)
}


export const initApplication = async () => {
  await getChannels()
  SseService.initSseChannels()
}

import { Channel } from "@/api/channel/channel";
import { useChannelStore } from "@/stores/channel.store";
import { useAppStore } from "@/stores/app.store";
import { Sse } from "@/services/Sse";

/*STORES*/
const channelStore = useChannelStore()
const appStore = useAppStore()

const getChannels = async () => {
  appStore.setPending(true)
  const channels = await Channel.getChannels()
  channelStore.setChannels(channels)
  appStore.setPending(false)
}


export const initApplication = async () => {
  await getChannels()
  Sse.initSseChannels()
}

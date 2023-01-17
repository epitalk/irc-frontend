import { Channel } from "@/api/channel/channel";
import { useChannelStore } from "@/stores/channel.store";
import { useAppStore } from "@/stores/app.store";
import { MERCURE_URL } from "@/utils/env";

/*STORES*/
const channelStore = useChannelStore()
const appStore = useAppStore()

const initChannels = async () => {
  appStore.setPending(true)
  const channels = await Channel.getChannels()
  channelStore.setChannels(channels)
  appStore.setPending(false)
}

const initSseChannels = () => {
  /*Channel SSE */
  const url = new URL(MERCURE_URL);
  url.searchParams.append("topic", "topics");
  const eventSource = new EventSource(url, { withCredentials: true });
  eventSource.onmessage = (e) => channelStore.addChannel(e.data);

  /* Fix firefox warning */
  window.addEventListener("beforeunload", () => eventSource.close());
}

export const initApplication = async () => {
  await initChannels()
  initSseChannels()
}

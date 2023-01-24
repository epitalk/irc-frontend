import { API_URL, MERCURE_URL } from "@/utils/env";
import { useChannelStore } from "@/stores/channel.store";
import axios from "axios";
import { useUserStore } from "@/stores/user.store";
import { Notyf } from "notyf";

export class Sse {
  private static eventSource: EventSource | undefined = undefined as EventSource | undefined;

  static initSseChannels = () => {
    const channelStore = useChannelStore();

    const eventSource = this.connectToTopic("topics");

    if (eventSource) {
      eventSource.onmessage = (e) => {
        if (channelStore) {
          console.log(e.data);
          channelStore.addChannel(e.data);
        }
      };
    }

  };

  static connectToTopic(topic: string): EventSource | undefined {
    console.log(topic);
    /*Channel SSE */
    const url = new URL(MERCURE_URL);
    url.searchParams.append("topic", topic);
    const eventSource = new EventSource(url, { withCredentials: true });

    /* Fix firefox warning */
    window.addEventListener("beforeunload", () => eventSource.close());
    return eventSource;
  }

  static getChannelMessages() {
    const channelStore = useChannelStore();

    if (this.eventSource) {
      this.eventSource.close();
    }
    this.eventSource = this.connectToTopic(channelStore.currentChannel);

    if (this.eventSource) {
      this.eventSource.onmessage = (e: { data: string }) => {
        if (!channelStore.messages[channelStore.currentChannel]) {
          channelStore.messages[channelStore.currentChannel] = [];
        }
        channelStore.messages[channelStore.currentChannel].push(JSON.parse(e.data).message);
      };
    }
  }

  static async addChannelMessage(message: string) {
    const channelStore = useChannelStore();
    const userStore = useUserStore();

    await axios.post(API_URL + "/chat/channel/" + channelStore.currentChannel, {
      message: {
        username: userStore.user?.username,
        content: message
      }
    });
  }
}

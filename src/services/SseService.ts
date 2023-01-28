import { adminChannels, API_URL, MERCURE_URL } from "@/utils/env";
import { useChannelStore } from "@/stores/channel.store";
import axios from "axios";
import { useUserStore } from "@/stores/user.store";
import { ChannelApi } from "@/api/channel/channel";
import { Notyf } from "notyf";
import { ChannelService } from "@/services/ChannelService";
import router from "@/router";

export class SseService {
  private static eventSource: EventSource | undefined = undefined as EventSource | undefined;
  private static notyf = new Notyf({ position: { x: "right", y: "top" } });

  static createChannel = async (channelName: string) => {
    const userStore = useUserStore();
    if (ChannelService.findChannelByName(channelName) || adminChannels.includes(channelName)) {
      return this.notyf.error(`Le channel ${channelName} existe déjà !`);
    }
    await ChannelApi.createChannel(channelName, userStore.user.username);

    await router.push("/channel/" + channelName);
  };

  static initSseChannels = async () => {
    const channelStore = useChannelStore();

    const eventTopics = await this.connectToTopic("topics");
    const eventActions = await this.connectToTopic("actions");

    if (eventTopics) {
      eventTopics.onmessage = (e) => {
        console.log(e);
        if (channelStore) {
          channelStore.addChannel(JSON.parse(e.data));
        }
      };
    }
    if (eventActions) {
      eventActions.onmessage = (e) => {
        console.log(e);
      };
    }
  };

  static async connectToTopic(topic: string): Promise<EventSource | undefined> {
    /*Channel SSE */
    const channelStore = useChannelStore();
    const userStore = useUserStore();
    const url = new URL(MERCURE_URL);
    const channel = ChannelService.findChannelByName(topic);

    if (channel && !adminChannels.includes(topic)) {
      const userStore = useUserStore();

      const userIsInChannel = channel.users?.find(u => u.id === userStore.user.id) !== undefined;
      if (!userIsInChannel) {
        ChannelApi.addUserChannel(topic, userStore.user.username).then(() => {
          channelStore.addUserChannel(topic, userStore.user);
        }).catch(() => {
          this.notyf.error("Erreur lors de l'ajout de l'utilisateur au channel");
        });
      }
    }
    if (!adminChannels.includes(topic) || topic === "general"){
      await ChannelApi.chatActions("join", userStore.user.username, topic)
    }

    url.searchParams.append("topic", topic);
    const eventSource = new EventSource(url, { withCredentials: true });

    /* Fix firefox warning */
    window.addEventListener("beforeunload", () => eventSource.close());
    return eventSource;
  }

  static async getChannelMessages() {
    const channelStore = useChannelStore();

    if (this.eventSource) {
      this.eventSource.close();
    }
    this.eventSource = await this.connectToTopic(channelStore.currentChannel);

    if (this.eventSource) {
      this.eventSource.onmessage = (e: { data: string }) => {
        if (!channelStore.messages[channelStore.currentChannel]) {
          channelStore.messages[channelStore.currentChannel] = [];
        }
        channelStore.messages[channelStore.currentChannel].push(JSON.parse(e.data));
      };
    }
  }

  static async leaveChannel(channelName: string) {
    const userStore = useUserStore();
    const channelSTore = useChannelStore();
    if (!ChannelService.findChannelByName(channelName)) {
      return this.notyf.error(`Le channel ${channelName} n'existe pas !`);
    }
    ChannelApi.removeUserChannel(channelName, userStore.user.username).catch(() => {
      this.notyf.error('Vous ne faites pas partie de ce channel.')
    });

    if (!adminChannels.includes(channelName) || channelName === "general"){
      await ChannelApi.chatActions("leave", userStore.user.username, channelName)
    }

    this.eventSource?.close();

    if (channelName === channelSTore.currentChannel) {
      await router.push("/general");
    }
  }

  static async addChannelMessage(message: string) {
    const channelStore = useChannelStore();
    const userStore = useUserStore();

    await axios.post(API_URL + "/api/message/channel/" + channelStore.currentChannel, {
      username: userStore.user?.username,
      content: message
    });
  }
}

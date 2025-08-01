import { adminChannels, API_URL, MERCURE_URL, MERCURE_TOKEN } from "@/utils/env";
import { useChannelStore } from "@/stores/channel.store";
import axios from "axios";
import { useUserStore } from "@/stores/user.store";
import { ChannelApi } from "@/api/channel/channel";
import { Notyf } from "notyf";
import { ChannelService } from "@/services/ChannelService";
import router from "@/router";
import type { ChannelModel } from "@/api/channel/channel.model";
import type { UserModel } from "@/api/user/user.model";
import { useAppStore } from "@/stores/app.store";

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
    const userStore = useUserStore();

    const eventTopics = await this.connectToTopic("topics");

    /*Sse event create, delete, join or leave channel*/
    if (eventTopics) {
      eventTopics.onmessage = (e) => {
        if (channelStore) {
          const res: { action: string, channel: ChannelModel, user: UserModel | null } = JSON.parse(e.data);

          switch (res.action) {
            case "create":
              channelStore.addChannel(res.channel);
              break;
            case "delete":
              channelStore.deleteChannel(res.channel.name);
              break;
            case "join":
              if (res.user) {
                channelStore.addUserChannel(res.channel.name, res.user);
              }

              break;
            case "leave":
              if (res.user) {
                channelStore.removeUserChannel(res.channel.name, res.user);
              }
              break;
          }
        }
      };
    }

    /*Sse event private message*/
    const userToken = userStore.user?.token;
    const eventPrivateMessage = await this.connectToTopic(`@me-${userToken}`);

    if (eventPrivateMessage){
      eventPrivateMessage.onmessage = (e) => {
        const res: { content: string, sender: string } = JSON.parse(e.data);
        userStore.addMessageInUserWithMessage({content: res.content, username: res.sender}, res.sender)
      }
    }
  };


  static async connectToTopic(topic: string): Promise<EventSource | undefined> {
    /*Channel SSE */
    const channelStore = useChannelStore();
    const userStore = useUserStore();
    const appStore = useAppStore();
    const url = new URL(MERCURE_URL);

    if (!appStore.isInPrivateMessage){
      const channel = ChannelService.findChannelByName(topic);

      const userIsInChannel = channel?.users?.find(u => u.id === userStore.user.id) !== undefined;
      if (channel && !adminChannels.includes(topic)) {
        const userStore = useUserStore();

        if (!userIsInChannel) {
          ChannelApi.addUserChannel(topic, userStore.user.username).then(() => {
            channelStore.addUserChannel(topic, userStore.user);
          }).catch(() => {
            return this.notyf.error("Erreur lors de l'ajout de l'utilisateur au channel");
          });
        }
      }
    }

    url.searchParams.append("topic", topic);
    url.searchParams.append("authorization", MERCURE_TOKEN);
    console.log(url)
    console.log({ MERCURE_TOKEN })
    const eventSource = new EventSource(url, { withCredentials: true });

    /* Fix firefox warning */
    window.addEventListener("beforeunload", () => eventSource.close());
    return eventSource;
  }

  static async getChannelMessages() {
    const channelStore = useChannelStore();
    const appStore = useAppStore();

    if (this.eventSource) {
      this.eventSource.close();
    }

    if (!appStore.isInPrivateMessage) {
      this.eventSource = await this.connectToTopic(channelStore.currentChannel);
    }


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
    const channel = ChannelService.findChannelByName(channelName);
    const userIsInChannel = channel?.users?.find(u => u.id === userStore.user.id) !== undefined;

    if (!ChannelService.findChannelByName(channelName)) {
      return this.notyf.error(`Le channel ${channelName} n'existe pas !`);
    }

    const errorNoIsChannel = "Vous ne faites pas partie de ce channel.";
    if (!userIsInChannel) {
      return this.notyf.error(errorNoIsChannel);
    }

    ChannelApi.removeUserChannel(channelName, userStore.user.username).catch(() => {
      return this.notyf.error(errorNoIsChannel);
    });

    this.eventSource?.close();

    if (channelName === channelSTore.currentChannel) {
      await router.push("/general");
    }
  }

  static async addPrivateMessage(content: string) {
    const channelStore = useChannelStore();
    const userStore = useUserStore();

    axios.post(`${API_URL}/api/message-private/${userStore.user?.username}/${channelStore.currentChannel}`, {
      content
    }).then(() => {
      const d = new Date()
      console.log( d.toISOString());

      userStore.addMessageInUserWithMessage({
        created_at: d.toISOString(),
        updated_at: d.toISOString(),
        content,
        username: userStore.user?.username
      }, channelStore.currentChannel)
    });
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

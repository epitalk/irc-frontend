import { adminChannels, API_URL, MERCURE_URL } from "@/utils/env";
import { useChannelStore } from "@/stores/channel.store";
import axios from "axios";
import { useUserStore } from "@/stores/user.store";
import { ChannelApi } from "@/api/channel/channel";
import { Notyf } from "notyf";
import { ChannelService } from "@/services/ChannelService";
import router from "@/router";
import type { ChannelModel } from "@/api/channel/channel.model";
import type { UserModel } from "@/api/user/user.model";

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

    /*Sse event create, delete, join or leave channel*/
    if (eventTopics) {
      eventTopics.onmessage = (e) => {
        if (channelStore) {
          const res: {action: string, channel: ChannelModel, user: UserModel | null} = JSON.parse(e.data)

          switch (res.action) {
            case 'create':
              channelStore.addChannel(res.channel);
              break;
            case 'delete':
              channelStore.deleteChannel(res.channel.name)
              break;
            case 'join':
              if (res.user){
                channelStore.addUserChannel(res.channel.name, res.user)
              }

              break;
            case 'leave':
              if (res.user){
                channelStore.removeUserChannel(res.channel.name, res.user)
              }
              break;
          }
        }
      };
    }

    /*Sse event private message*/
    const userToken = "eyJhbGciOiJIUzI1NiJ9.ZGR6ZHo.5Onqs--VaZwP3TUR9EPpnWv0-7twffDU9fhnVLX1coc";
    const privateMessageEvent = await this.connectToTopic(`@me-${userToken}`)

    if (privateMessageEvent){
      privateMessageEvent.onmessage =(e) => {
        console.log(e.data);
      }
    }
  };



  static async connectToTopic(topic: string): Promise<EventSource | undefined> {
    console.log("connectToTopic", topic);
    /*Channel SSE */
    const channelStore = useChannelStore();
    const userStore = useUserStore();
    const url = new URL(MERCURE_URL);
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
    const channel = ChannelService.findChannelByName(channelName);
    const userIsInChannel = channel?.users?.find(u => u.id === userStore.user.id) !== undefined;

    if (!ChannelService.findChannelByName(channelName)) {
      return this.notyf.error(`Le channel ${channelName} n'existe pas !`);
    }

    const errorNoIsChannel = "Vous ne faites pas partie de ce channel."
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

  static async addChannelMessage(message: string) {
    const channelStore = useChannelStore();
    const userStore = useUserStore();

    await axios.post(API_URL + "/api/message/channel/" + channelStore.currentChannel, {
      username: userStore.user?.username,
      content: message
    });
  }
}

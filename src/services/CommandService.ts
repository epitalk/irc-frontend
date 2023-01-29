import { SseService } from "@/services/SseService";
import { useChannelStore } from "@/stores/channel.store";
import { Notyf } from "notyf";
import { useUserStore } from "@/stores/user.store";
import { ChannelService } from "@/services/ChannelService";
import { ChannelApi } from "@/api/channel/channel";
import router from "@/router";
import { UserApi } from "@/api/user/user";
import { adminChannels } from "@/utils/env";
import axios from "axios";

export class CommandService {
  static notyf = new Notyf({ position: { x: "right", y: "top" } });
  static commands = [
    {
      command: "/join",
      description: "channel: rejoindre le channel spécifié."
    },
    {
      command: "/list",
      description: "[recherche] : liste les channel disponibles sur le serveur. Si un mot est spécifiée, n'affiche que ceux dont le channel contient la mot."
    },
    {
      command: "/users",
      description: "lister les utilisateurs actuellement dans le channel."
    },
    {
      command: "/nick",
      description: "pseudo : définit le pseudo de l'utilisateur sur le serveur."
    },
    {
      command: "/create",
      description: "channel : créez un channel avec le nom spécifié."
    },
    {
      command: "/delete",
      description: "channel : supprime un channel avec le nom spécifié."
    },
    {
      command: "/msg",
      description: "pseudo message: envoie un message privé au pseudo spécifié."
    },
    {
      command: "/leave",
      description: "channel: quitter le channel spécifié."
    }
  ];

  static showArgumentError() {
    this.notyf.error("Mauvais type d'argument pour cette commande !");
  }

  static executeCommand(index: number, ...args: any[]) {
    if (index < 0 || index >= this.commands.length) {
      this.notyf.error("Index de commande non valide !");
      return;
    }
    switch (index) {
      case 0:
        if (typeof args[0] === "string") {
          return this.joinChannel(args[0]);
        }
        return this.showArgumentError();
      case 1:
        if (args.length === 0 || (args.length === 1 && typeof args[0] === "string")) {
          return this.listChannel(args[0]);
        }
        return this.showArgumentError();
      case 2:
        if (args.length === 0) {
          return this.channelUsers();
        }
        return this.showArgumentError();
      case 3:
        if (args.length === 1 && typeof args[0] === "string") {
          return this.setUsername(args[0].trim());
        }
        return this.showArgumentError();
      case 4:
        if (args.length === 1 && typeof args[0] === "string") {
          return this.createChannel(args[0].trim());
        }
        return this.showArgumentError();
      case 5:
        if (args.length === 1 && typeof args[0] === "string") {
          return this.deleteChannel(args[0].trim());
        }
        return this.showArgumentError();
      case 6:
        if (args.length === 2 && typeof args[0] === "string" && typeof args[1] === "string") {
          return this.sendPrivateMessage(args[0].trim(), args[1].trim());
        }
        return this.showArgumentError()
      case 7:
        if (args.length === 1 && typeof args[0] === "string") {
          return this.leaveChannel(args[0].trim());
        }
        return this.showArgumentError();
    }
  }

  static async joinChannel(channelName: string) {

    if (adminChannels.includes(channelName) || !ChannelService.findChannelByName(channelName)) {
      this.notyf.error(`Le channel ${channelName} n'existe pas !`);
      return undefined;
    }
    // await SseService.connectToTopic(channelName);
    await router.push("/channel/" + channelName)
  }

  static listChannel(search: string | undefined) {
    const channelStore = useChannelStore();
    channelStore.addBotMessage('list', { search })
  }

  static channelUsers() {
    const channelStore = useChannelStore();
    channelStore.addBotMessage('channel_users')
  }

  static setUsername(username: string | undefined) {
    if (username){
      const userStore = useUserStore()
      UserApi.update(userStore.user.username, username).then((r) => {
        ChannelService.replaceUsernameInChannels(userStore.user.username, username)
        userStore.setUser(r.data)
      }).catch(() => {
        this.notyf.error(`Un utilisateur utilise déjà ce nom d'utilisateur.`);
      })
    }
  }

  static async createChannel(channelName: string | undefined) {
    if (channelName) {
      await SseService.createChannel(channelName)
    }
  }

  static async deleteChannel(channelName: string) {
    ChannelApi.deleteChannel(channelName).catch(() => {
      this.notyf.error(`Le channel ${channelName} n'existe pas !`);
    })
  }

  static sendPrivateMessage(username: string, message: string) {
    console.log("sendPrivateMessage", username, message);
  }

  static async leaveChannel(channelName: string) {
    const channelStore = useChannelStore()
    await SseService.leaveChannel(channelName)

    if (channelName === channelStore.currentChannel){
      await this.joinChannel("general")
    }
  }
}

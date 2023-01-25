import { SseService } from "@/services/SseService";
import { useChannelStore } from "@/stores/channel.store";
import { Notyf } from "notyf";
import { useUserStore } from "@/stores/user.store";
import { ChannelService } from "@/services/ChannelService";
import { ChannelApi } from "@/api/channel/channel";

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

  static joinChannel(channelName: string) {
    const channelStore = useChannelStore();

    if (channelName === "topics" || !ChannelService.findChannelByName(channelName)) {
      this.notyf.error(`Le channel ${channelName} n'existe pas !`);
      return undefined;
    }
    SseService.connectToTopic(channelName);
    channelStore.setCurrentChannel(channelName);
  }

  static listChannel(search: string | undefined) {
    const channelStore = useChannelStore();
    console.log("list channel", search);
    channelStore.addBotMessage('list')
  }

  static channelUsers() {
    console.log("channelUsers");
  }

  static setUsername(username: string | undefined) {
    const userStore = useUserStore()
    userStore.setUsername(username)
  }

  static async createChannel(channelName: string | undefined) {
    if (channelName) {
      await SseService.createChannel(channelName)
    }
  }

  static async deleteChannel(channelName: string) {
    const channelStore = useChannelStore()
    ChannelApi.deleteChannel(channelName).then(() => {
      channelStore.deleteChannel(channelName)
    }).catch(() => {
      this.notyf.error(`Le channel ${channelName} n'existe pas !`);
    })
  }

  static sendPrivateMessage(username: string, message: string) {
    console.log("sendPrivateMessage", username, message);
  }

  static leaveChannel(channelName: string) {
    SseService.leaveChannel(channelName)
    this.joinChannel("general")
  }
}

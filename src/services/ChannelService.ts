import { useChannelStore } from "@/stores/channel.store";

export class ChannelService {
  static findChannelByName(name: string) {
    const channelStore = useChannelStore();
    return channelStore.channels.find(c => c.name === name);
  }

  static replaceUsernameInChannels(oldUsername: string, username: string) {
    const channelStore = useChannelStore();

    channelStore.channels.map(channel => {
      channel.users.map(user => {
        if (user.username === oldUsername) {
          user.username = username;
        }
      });
    });
  }
}

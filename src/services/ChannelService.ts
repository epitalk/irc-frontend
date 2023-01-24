import { useChannelStore } from "@/stores/channel.store";

export class ChannelService {
   static findChannelByName(name: string){
     const channelStore = useChannelStore();
     return channelStore.channels.find(c => c.name === name)
   }
}

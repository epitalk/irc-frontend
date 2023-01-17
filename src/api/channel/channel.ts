import axios from "axios";
import { API_URL } from "@/utils/env";

export class Channel {
  static async createChannel(channelName: string) {
    await axios.post(API_URL + '/chat/channel', { name: channelName })
  }
  static async getChannels(): Promise<string[]> {
    const channels = await axios.get(API_URL + '/chat/channels')
    return channels.data || []
  }
}

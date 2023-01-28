import type { AxiosResponse } from "axios";
import axios from "axios";
import { API_URL } from "@/utils/env";
import type { ChannelModel } from "@/api/channel/channel.model";

export class ChannelApi {
  static channelApiUrl = API_URL + "/api/channel";

  static async createChannel(channelName: string, author: string) {
    await axios.post(this.channelApiUrl, { name: channelName, author });
  }
  static async chatActions(event: "leave" | "join", username: string, channel: string){
    await axios.post(this.channelApiUrl + '/actions', { event, username, channel });
  }

  static async addUserChannel(channel: string, username: string) {
    await axios.post(this.channelApiUrl + "/user", { channel, username });
  }

  static async removeUserChannel(channel: string, username: string) {
    await axios.delete(this.channelApiUrl + "/user", { data: { channel, username } });
  }

  static async getChannels(): Promise<AxiosResponse<ChannelModel[]>> {
    return await axios.get(this.channelApiUrl);
  }

  static async deleteChannel(channelName: string) {
    await axios.delete(`${this.channelApiUrl}/${channelName}`);
  }
}

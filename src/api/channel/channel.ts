import type { AxiosResponse } from "axios";
import axios from "axios";
import { API_URL } from "@/utils/env";
import type { ChannelModel } from "@/api/channel/channel.model";

export class ChannelApi {
  static channelApiUrl = API_URL + "/api/channel";
  static async createChannel(channelName: string) {
    await axios.post(this.channelApiUrl, { name: channelName })
  }
  static async getChannels(): Promise<AxiosResponse<ChannelModel[]>> {
    return await axios.get(this.channelApiUrl)
  }
}

import { API_URL } from "@/utils/env";
import axios from "axios";
import type { AxiosResponse } from "axios";
import type { PrivateMessageModel } from "@/api/message/message.model";

export class Message {
  static privateMessageApiUrl = API_URL + "/api/message-private";

  static async getUserPrivateMessage(userId: number): Promise<AxiosResponse<PrivateMessageModel[]>> {
    return await axios.get(`${this.privateMessageApiUrl}/${userId}`);
  }
}

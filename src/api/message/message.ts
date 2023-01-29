import { API_URL } from "@/utils/env";
import axios from "axios";
import type { AxiosResponse } from "axios";
import type { UserModel } from "@/api/user/user.model";

export class MessageApi {
  static privateMessageApiUrl = API_URL + "/api/message-private";

  static async getUsersWithMessage(userId: number): Promise<AxiosResponse<UserModel[]>> {
    return await axios.get(`${this.privateMessageApiUrl}/${userId}`);
  }
}

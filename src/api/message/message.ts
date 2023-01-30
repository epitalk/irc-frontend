import { API_URL } from "@/utils/env";
import axios from "axios";
import type { AxiosResponse } from "axios";
import type { usersWithMessage } from "@/stores/user.store";

export class MessageApi {
  static privateMessageApiUrl = API_URL + "/api/message-private";

  static async getUsersWithMessage(userId: number): Promise<AxiosResponse<usersWithMessage[]>> {
    return await axios.get(`${this.privateMessageApiUrl}/${userId}`);
  }
}

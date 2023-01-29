import axios from "axios";
import type { AxiosResponse } from "axios";
import { API_URL } from "@/utils/env";
import type {UserModel} from "@/api/user/user.model"

export class UserApi {
  static userApiUrl = API_URL + "/api/user";

  static async create(username: string): Promise<{data: UserModel}> {
    return await axios.post(this.userApiUrl, { username });
  }

  static all(): Promise<AxiosResponse<UserModel[]>> {
    return axios.get(this.userApiUrl)
  }
  //
  // static find(id: number): Promise<UserType> {
  //   return axios.get(API_URL + '/user/' + id).then(response => response).catch(err => err)
  // }
  //
  static async update(oldUsername: string, username: string): Promise<{data: UserModel}> {
    return await axios.put(`${this.userApiUrl}/${oldUsername}`, {username})
  }
  //
  // static delete(id: number): Promise<null> {
  //   return axios.delete(API_URL + '/user/' + id).then(response => response).catch(err => err)
  // }
}

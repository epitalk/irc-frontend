import type { TimeStamps } from "@/api/generic";
import type { UserModel } from "@/api/user/user.model";

export interface ChannelModel extends TimeStamps {
    id: number,
    name: string,
    users: UserModel[]
}

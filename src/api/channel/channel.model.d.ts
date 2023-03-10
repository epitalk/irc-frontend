import type { TimeStamps } from "@/api/generic";
import type { UserModel } from "@/api/user/user.model";
import type { Message } from "@/api/message/message.model";

export interface ChannelModel extends TimeStamps {
    id: number,
    name: string,
    users: UserModel[]
    messages: Message[] | []
}

export type ChatEvent = {
    event: "leave" | "join",
    username: string,
    channel: string
}

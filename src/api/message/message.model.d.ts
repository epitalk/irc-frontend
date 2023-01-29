import type { TimeStamps } from "@/api/generic";
import type { User } from "@/api/user/user";
import type { UserModel } from "@/api/user/user.model";

export interface BaseMessage extends TimeStamps {
    id: number,
    content: string,
}

export interface Message extends TimeStamps, BaseMessage {
    channel_id: number,
    username: string
    user: User,
    isUserMessage: boolean
}

export interface PrivateMessageModel extends TimeStamps, BaseMessage {
    receiver_id: number,
    sender_id: number,
    receiver: UserModel,
    sender: UserModel
}



export type MessageCommand = {
    content: string,
    username: string
}

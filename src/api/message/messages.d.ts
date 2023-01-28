import type { TimeStamps } from "@/api/generic";
import type { User } from "@/api/user/user";

export interface Message extends TimeStamps {
    id: number,
    content: string,
    channel_id: number,
    username: string
    user: User,
    isUserMessage: boolean
}

export type MessageCommand = {
    content: string,
    username: string
}

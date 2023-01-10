import type { TimeStamps } from "@/api/generic";
import type { User } from "@/api/user/user";

export interface Message extends TimeStamps {
    id: number,
    content: string,
    channel_id: number,
    user_id: number,
    user: User,
    isUserMessage: boolean
}

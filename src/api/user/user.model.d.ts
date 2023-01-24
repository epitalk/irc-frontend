import type { TimeStamps } from "@/api/generic";

export interface UserModel extends TimeStamps {
    id: number,
    username: string
}

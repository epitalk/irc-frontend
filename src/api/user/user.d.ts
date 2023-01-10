import type { TimeStamps } from "@/api/generic";

export interface User extends TimeStamps {
    id: number,
    username: string
}

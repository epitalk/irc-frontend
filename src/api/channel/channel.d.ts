import type { TimeStamps } from "@/api/generic";

export interface Channel extends TimeStamps {
    id: number,
    name: string
}

import type { TimeStamps } from "@/api/generic";

export interface ChannelModel extends TimeStamps {
    id: number,
    name: string
}

export type Emojis = {
    emoji: string; category: number; name: string; version: string; variations?: undefined;
} | {
    emoji: string; category: number; name: string; variations: string[]; version: string;
}

import type { Id } from "./id";

export interface IComment extends Id {
    fromWho: string;
    rating: number; // max 5
    value: string;
    photoUrl: string;
}

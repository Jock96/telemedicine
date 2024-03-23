import type { IntRange } from "./common";
import type { Id } from "./id";

export interface IComment extends Id {
    fromWho: string;
    rating: IntRange<0, 6>;
    value: string;
    photoUrl: string;
}

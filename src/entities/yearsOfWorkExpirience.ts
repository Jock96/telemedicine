import type { IntRange } from "./common";

export interface IYearsOfWorkExpirience {
  years?: IntRange<0, 51>; // max 50
  months?: IntRange<0, 12>; // max 11
}

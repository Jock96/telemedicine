import type { IntRange } from "./common";
import type { ISpecialization } from "./specialization";

export interface IWorkDuration {
  specialization: ISpecialization;
  value: {
    hours?: IntRange<0, 9>;
    minutes?: IntRange<0, 59>;
  };
}

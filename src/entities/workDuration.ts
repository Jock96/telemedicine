import type { ISpecialization } from "./specialization";

export interface IWorkDuration {
  specialization: ISpecialization;
  value: {
    hours?: number;
    minutes?: number;
  }
}

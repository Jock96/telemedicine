import { ISpecialization } from "./specialization";

export type IFilterType =
  | "more"
  | "less"
  | "equal"
  | "more-or-equal"
  | "less-or-equal"
  | "range";

export interface IFilter {
  search?: string;
  yearsOfWorkExpirience?: {
    filterType: IFilterType;
    value: string | [string, string];
  };
  rating?: {
    filterType: IFilterType;
    value: number | [number, number];
  };
  nearestWorkTime?: {
    filterType: IFilterType;
    value: string | [string, string];
  };
  specializations?: {
    value: ISpecialization[];
  };
}

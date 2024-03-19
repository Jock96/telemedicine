import type { ISorter } from "./sorter";
import type { ISpecialist } from "./specialist";
import type { ISpecialization } from "./specialization";

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
    value: ISpecialist["yearsOfWorkExpirience"] | [ISpecialist["yearsOfWorkExpirience"], ISpecialist["yearsOfWorkExpirience"]];
  };
  rating?: {
    filterType: IFilterType;
    value: number | [number, number];
  };
  nearestWorkTime?: {
    filterType: IFilterType;
    value: ISpecialist["nearestWorkTime"] | [ISpecialist["nearestWorkTime"], ISpecialist["nearestWorkTime"]];
  };
  specializations?: {
    value: ISpecialization[];
  };
  sort?: ISorter[]
}

import type { IAllowedFilters, IFilterChanger } from "../../../../types";

export interface IFilterSwitch extends IFilterChanger {
  type: keyof IAllowedFilters;
  value?: IAllowedFilters[keyof IAllowedFilters];
}

export interface ISpecificFilter<Key extends keyof IAllowedFilters> {
  data: IAllowedFilters[Key];
  onChange: (data: IAllowedFilters[Key]) => void;
}
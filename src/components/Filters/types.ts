import type { IFilter, ISortBy } from "../../entities";

export type IAllowedFilters = Omit<IFilter, "search" | "sort">;

export interface IFilterChanger {
  onChange: (
    key: keyof IAllowedFilters,
    data: IAllowedFilters[keyof IAllowedFilters]
  ) => void;
}

export interface IForbiddenFilters {
  forbiddenFilters?: Array<keyof IAllowedFilters>;
}

export interface IForbiddenSortBy {
  forbiddenSortBy?: ISortBy[];
}

export interface IFiltersProps extends IForbiddenFilters, IForbiddenSortBy {
  hideSearch?: boolean;
  hideFilters?: boolean;
  hideSort?: boolean;
}

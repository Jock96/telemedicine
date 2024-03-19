import type { ReactNode } from "react";
import type { IFilterType } from "../../../../../../entities";
import type { IAllowedFilters } from "../../../../types";

export interface IDefaultFilterProps {
  filterKey: keyof IAllowedFilters;
  data: IAllowedFilters[keyof IAllowedFilters];
  type: IFilterType;
  children?: ReactNode;
  disabled?: boolean;
  onApply(): void;
  onClose(): void;
  onChangeType(type: IFilterType): void;
}

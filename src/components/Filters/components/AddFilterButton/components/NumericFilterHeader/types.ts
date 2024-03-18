import type { IFilterType } from "../../../../../../entities";

export interface NumericFilterHeaderProps {
  onChange(type: IFilterType): void;
  type: IFilterType;
}

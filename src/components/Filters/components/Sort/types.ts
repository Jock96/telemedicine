import type { ISorter } from "../../../../entities";
import type { IForbiddenSortBy } from "../../types";

export interface ISortProps extends IForbiddenSortBy {
    value?: ISorter[];
    onChange(value: ISorter[]): void;
}
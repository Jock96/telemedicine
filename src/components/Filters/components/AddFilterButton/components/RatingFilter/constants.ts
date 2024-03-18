import type { IFilterType } from "../../../../../../entities";

export const MIN_RANGE = 0;

export const MAX_RANGE = 5;

export const FILTER_TYPE_TO_LABEL_PREFIX: Record<IFilterType, string> = {
    equal: "",
    less: "меньше ",
    "less-or-equal": "меньше или равно ",
    more: "больше ",
    "more-or-equal": "больше или равно ",
    "range": ""
}

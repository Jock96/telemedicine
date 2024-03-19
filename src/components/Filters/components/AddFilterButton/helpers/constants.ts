import type { IFilterType } from "../../../../../entities";

export const FILTER_TYPE_TO_LABEL_PREFIX: Record<IFilterType, string> = {
  equal: "",
  less: "меньше",
  "less-or-equal": "меньше или равно",
  more: "больше",
  "more-or-equal": "больше или равно",
  range: "",
};

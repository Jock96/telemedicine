import type { IAllowedFilters } from "../../types";

export const FilterKeyToLabelMap: Record<keyof IAllowedFilters, string> = {
  nearestWorkTime: "Ближайшая запись",
  yearsOfWorkExpirience: "Стаж работы",
  specializations: "Специализации",
  rating: "Рейтинг",
};

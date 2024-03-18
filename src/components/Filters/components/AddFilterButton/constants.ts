import type { IAddFilterButton } from "./types";

export const FilterKeyToLabelMap: Record<keyof IAddFilterButton, string> =
  {
    nearestWorkTime: "Ближайшая запись",
    yearsOfWorkExpirience: "Стаж работы",
    specializations: "Специализации",
    rating: "Рейтинг",
  };

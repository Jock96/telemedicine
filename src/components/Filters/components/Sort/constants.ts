import type { ISortBy, ISortDirection } from "../../../../entities";

export const SortKeyToLabelMap: Record<ISortBy, string> = {
  nearestWorkTime: "Ближайшая запись",
  yearsOfWorkExpirience: "Стаж работы",
  rating: "Рейтинг",
  workDuration: "Длительность консультации"
};

export const SortDirectionToLabelMap: Record<ISortDirection, string> = {
  ASC: "По возрастанию",
  DESC: "По убыванию"
}

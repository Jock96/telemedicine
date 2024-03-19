export enum ISortDirection {
  ASC = "ASC",
  DESC = "DESC",
}

export type ISortBy =
  | "rating"
  | "workDuration"
  | "yearsOfWorkExpirience"
  | "nearestWorkTime";

export interface ISorter {
  direction: ISortDirection;
  sortBy: ISortBy;
}

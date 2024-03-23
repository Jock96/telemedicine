import type { ISpecialist } from "../../entities";

export interface IRegisterCalendarProps
  extends Pick<ISpecialist, "visiteDates" | "slots" | "workDuration"> {
  wrapInCard?: boolean;
}

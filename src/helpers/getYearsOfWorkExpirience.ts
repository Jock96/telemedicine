import type { ISpecialist } from "../entities/specialist";

export const getYearsOfWorkExpirience = ({
  years,
  months,
}: ISpecialist["yearsOfWorkExpirience"]) => {
  // TODO: plural
  return `${years ? `${years} года ` : ""}${months ? `${months} месяца` : ""}`;
};

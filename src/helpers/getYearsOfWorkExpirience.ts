import dayjs from "dayjs";

export const getYearsOfWorkExpirience = (date: string) => {
  const years = dayjs(date).get("years");
  const monthes = dayjs(date).get("months");

  // TODO: plural
  return `${years ? `${years} года ` : ""}${
    monthes ? `${monthes} месяца` : ""
  }`;
};

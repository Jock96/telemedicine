import type { IUser } from "../entities";

export const getFullName = ({
  firstName,
  lastName,
  patronymic,
}: Pick<IUser, "firstName" | "lastName" | "patronymic">) =>
  `${lastName} ${firstName}${patronymic ? " " + patronymic : ""}`;

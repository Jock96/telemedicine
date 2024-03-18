import { FC } from "react";
import type { IAddFilterButtonProps } from "../../types";

export const YearsOfWorkExpirienceFilter: FC<{
  value: IAddFilterButtonProps["yearsOfWorkExpirience"];
}> = ({ value }) => {
  if (!value) {
    return null;
  }

  return null;
};

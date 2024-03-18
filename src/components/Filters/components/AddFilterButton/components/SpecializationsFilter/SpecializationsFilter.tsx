import { FC } from "react";
import type { IAddFilterButtonProps } from "../../types";

export const SpecializationsFilter: FC<{
  value: IAddFilterButtonProps["specializations"];
}> = ({ value }) => {
  if (!value) {
    return null;
  }

  return null;
};

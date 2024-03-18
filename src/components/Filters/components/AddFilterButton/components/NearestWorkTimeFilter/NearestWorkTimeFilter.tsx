import { FC } from "react";
import type { IAddFilterButtonProps } from "../../types";

export const NearestWorkTimeFilter: FC<{
  value: IAddFilterButtonProps["nearestWorkTime"];
}> = ({ value }) => {
  if (!value) {
    return null;
  }

  return null;
};

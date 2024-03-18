import type { FC } from "react";
import type { IAddFilterButtonProps } from "../../types";
import { NearestWorkTimeFilter } from "../NearestWorkTimeFilter";
import { RatingFilter } from "../RatingFilter";
import { SpecializationsFilter } from "../SpecializationsFilter";
import { YearsOfWorkExpirienceFilter } from "../YearsOfWorkExpirienceFilter";
import type { IFilterSwitch } from "./types";

export const FilterSwitch: FC<IFilterSwitch> = ({ type, value, onChange }) => {
  switch (type) {
    case "nearestWorkTime":
      return (
        <NearestWorkTimeFilter
          value={value as IAddFilterButtonProps["nearestWorkTime"]}
        />
      );

    case "rating":
      return (
        <RatingFilter
          value={value as IAddFilterButtonProps["rating"]}
          onChange={(data) => onChange("rating", data)}
        />
      );

    case "specializations":
      return (
        <SpecializationsFilter
          value={value as IAddFilterButtonProps["specializations"]}
        />
      );

    case "yearsOfWorkExpirience":
      return (
        <YearsOfWorkExpirienceFilter
          value={value as IAddFilterButtonProps["yearsOfWorkExpirience"]}
        />
      );

    default:
      return null;
  }
};

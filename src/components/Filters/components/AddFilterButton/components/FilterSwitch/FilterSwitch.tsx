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
          onChange={(data) => onChange("nearestWorkTime", data)}
          data={value as IAddFilterButtonProps["nearestWorkTime"]}
        />
      );

    case "rating":
      return (
        <RatingFilter
          data={value as IAddFilterButtonProps["rating"]}
          onChange={(data) => onChange("rating", data)}
        />
      );

    case "specializations":
      return (
        <SpecializationsFilter
          data={value as IAddFilterButtonProps["specializations"]}
          onChange={(data) => onChange("specializations", data)}
        />
      );

    case "yearsOfWorkExpirience":
      return (
        <YearsOfWorkExpirienceFilter
          data={value as IAddFilterButtonProps["yearsOfWorkExpirience"]}
          onChange={(data) => onChange("yearsOfWorkExpirience", data)}
        />
      );

    default:
      return null;
  }
};

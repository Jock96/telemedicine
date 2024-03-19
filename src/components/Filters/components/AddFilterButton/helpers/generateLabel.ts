import type { IFilterType } from "../../../../../entities";
import { FilterKeyToLabelMap } from "../constants";
import { FILTER_TYPE_TO_LABEL_PREFIX } from "./constants";
import type { IYearsOfWorkExpirience } from "../../../../../entities";
import type { IAllowedFilters } from "../../../types";

interface IFilterLabelGenerator {
  key: keyof IAllowedFilters;
  data: IAllowedFilters[keyof IAllowedFilters];
  type: IFilterType;
}

// TODO: plural
const generateYearsOfWorkExpirienceLabel = ({
  years,
  months,
}: IYearsOfWorkExpirience) =>
  `${years ? `${years} лет` : ""}${years && months ? " " : ""}${
    months ? `${months} месяцев` : ""
  }`;

const generateFromTo = ({ key, data }: Omit<IFilterLabelGenerator, "type">) => {
  if (!data) return;

  const [from, to] =
    key === "yearsOfWorkExpirience"
      ? [
          generateYearsOfWorkExpirienceLabel(
            (data.value as [IYearsOfWorkExpirience, IYearsOfWorkExpirience])[0]
          ),
          generateYearsOfWorkExpirienceLabel(
            (data.value as [IYearsOfWorkExpirience, IYearsOfWorkExpirience])[1]
          ),
        ]
      : (data.value as [string, string]);

  return ` от ${from} до ${to}`;
};

export const generateLabel = ({ key, data, type }: IFilterLabelGenerator) =>
  !data
    ? FilterKeyToLabelMap[key]
    : `${FilterKeyToLabelMap[key]}:${
        Array.isArray(data?.value)
          ? generateFromTo({ key, data })
          : ` ${
              FILTER_TYPE_TO_LABEL_PREFIX[type]
                ? FILTER_TYPE_TO_LABEL_PREFIX[type] + " "
                : ""
            }${
              key === "yearsOfWorkExpirience"
                ? generateYearsOfWorkExpirienceLabel(
                    data.value as IYearsOfWorkExpirience
                  )
                : data.value
            }`
      }`;

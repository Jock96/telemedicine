import type { IAllowedFilters } from "../../../types";
import { FilterKeyToLabelMap } from "../constants";

export const generateSpecializationsLabel = (
  data: IAllowedFilters["specializations"]
) => {
  if (!data) return { label: "", rest: [] };

  const [first, second, third, fourth, ...rest] = data.value;

  return {
    label: `${FilterKeyToLabelMap["specializations"]}: ${[first, second, third, fourth].filter(Boolean).join(", ")}${
      rest.length ? ` и ещё ${rest.length}` : ""
    }`,
    rest,
  };
};

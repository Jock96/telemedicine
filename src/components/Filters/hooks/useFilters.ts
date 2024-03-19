import { useEffect } from "react";
import type { IFilter, ISorter } from "../../../entities";
import { usePrevious, useUrlStatePrams } from "../../../hooks";
import { useLocation } from "react-router-dom";
import type { IFilterChanger } from "../types";
import { FILTERS_KEY, INITAL_FILTER_STATE } from "./constants";

export const useFilters = () => {
  const location = useLocation();
  const prevLocation = usePrevious(location);

  const storedValue = window.localStorage.getItem(
    FILTERS_KEY + location.pathname
  );
  const initialState = storedValue
    ? JSON.parse(storedValue)
    : INITAL_FILTER_STATE;

  const [state, setState] = useUrlStatePrams<IFilter>({
    paramsName: FILTERS_KEY,
    initialState: initialState,
  });

  useEffect(() => {
    if (prevLocation! === location) {
      window.localStorage.setItem(
        FILTERS_KEY + location.pathname,
        JSON.stringify(state)
      );
    }
  }, [location, prevLocation, state]);

  const onSearchChange = (search: string) => {
    setState({ ...state, search: search.trim() === "" ? undefined : search });
  };

  const onFiltersChange: IFilterChanger["onChange"] = (key, data) => {
    setState({ ...state, [key]: data });
  };

  const onSortChange = (sort: ISorter[]) => {
    setState({ ...state, sort });
  };

  const onDropFilters = () => {
    setState(INITAL_FILTER_STATE);
  };

  const { search, sort, ...filters } = state ?? {};

  return {
    sort,
    search,
    filters,
    hasFilters:
      !!state && JSON.stringify(state) !== JSON.stringify(INITAL_FILTER_STATE),
    onSearchChange,
    onFiltersChange,
    onSortChange,
    onDropFilters,
  };
};

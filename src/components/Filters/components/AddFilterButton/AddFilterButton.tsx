import { FC, useState } from "react";
import { Flex, Button, Dropdown } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { IAddFilterButtonProps } from "./types";
import { FilterKeyToLabelMap } from "./constants";
import { FilterSwitch, IFilterSwitch } from "./components";
import type { IAllowedFilters, IFilterChanger } from "../../types";
import type { IFilter } from "../../../../entities";

export const AddFilterButton: FC<IAddFilterButtonProps> = ({
  onChange,
  forbiddenFilters: forbiddenFiltersProp,
  ...filter
}) => {
  const forbiddenFilters = forbiddenFiltersProp
    ? Array.from(new Set(forbiddenFiltersProp))
    : undefined;

  const [preparingFilterKey, setPreparingFilterKey] =
    useState<keyof IAllowedFilters>();

  const allowedFilter: IFilter = forbiddenFilters
    ? Object.entries(filter)
        .filter(
          ([key]) => !forbiddenFilters.includes(key as keyof IAllowedFilters)
        )
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
    : filter;

  const filterValues = Object.values(allowedFilter);

  const canShowAddFilterButton =
    (!filterValues.length ||
      filterValues.some(({ value }) => value !== undefined)) &&
    filterValues.length !==
      Object.keys(FilterKeyToLabelMap).filter(
        (key) => !forbiddenFilters?.includes(key as keyof IAllowedFilters)
      ).length &&
    forbiddenFilters?.length !== Object.keys(FilterKeyToLabelMap).length;

  const prepareFilter = (key: keyof IAllowedFilters) => {
    setPreparingFilterKey(key);
  };

  const handleChange: IFilterChanger["onChange"] = (key, data) => {
    onChange(key, data);
    setPreparingFilterKey(undefined);
  };

  return (
    <Flex gap={4} wrap="wrap">
      {Object.entries(allowedFilter).map(([key, value]) => (
        <FilterSwitch
          key={key}
          type={key as IFilterSwitch["type"]}
          value={value}
          onChange={handleChange}
        />
      ))}
      {preparingFilterKey && (
        <FilterSwitch type={preparingFilterKey} onChange={handleChange} />
      )}
      {canShowAddFilterButton && !preparingFilterKey && (
        <Dropdown
          menu={{
            items: Object.entries(FilterKeyToLabelMap)
              .filter(([key]) =>
                forbiddenFilters
                  ? !forbiddenFilters.includes(key as keyof IAllowedFilters)
                  : true
              )
              .filter(
                ([key]) =>
                  allowedFilter[key as keyof IAllowedFilters] === undefined
              )
              .map(([key, label]) => ({
                key,
                label,
                onClick: () => prepareFilter(key as keyof IAllowedFilters),
              })),
          }}
        >
          <Button type="text" icon={<PlusOutlined />}>
            Добавить фильтр
          </Button>
        </Dropdown>
      )}
    </Flex>
  );
};

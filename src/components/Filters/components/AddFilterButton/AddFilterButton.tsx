import { FC, useState } from "react";
import { Flex, Button, Dropdown } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type {
  IAddFilterButton,
  IAddFilterButtonProps,
  IFilterChanger,
} from "./types";
import { FilterKeyToLabelMap } from "./constants";
import { FilterSwitch, IFilterSwitch } from "./components";

export const AddFilterButton: FC<IAddFilterButtonProps> = ({
  onChange,
  ...filter
}) => {
  const [preparingFilterKey, setPreparingFilterKey] =
    useState<keyof IAddFilterButton>();

  const filterValues = Object.values(filter);
  const canShowAddFilterButton =
    !filterValues.length ||
    filterValues.some(({ value }) => value !== undefined);

  const prepareFilter = (key: keyof IAddFilterButton) => {
    setPreparingFilterKey(key);
  };

  const handleChange: IFilterChanger["onChange"] = (key, data) => {
    onChange(key, data);
    setPreparingFilterKey(undefined);
  };

  return (
    <Flex gap={4}>
      {Object.entries(filter).map(([key, value]) => (
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
              .filter(
                ([key]) => filter[key as keyof IAddFilterButton] === undefined
              )
              .map(([key, label]) => ({
                key,
                label,
                onClick: () => prepareFilter(key as keyof IAddFilterButton),
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

import { FC, useState } from "react";
import type { IAddFilterButtonProps } from "../../types";
import { Dropdown, Button, Flex, InputNumber } from "antd";
import { useToken } from "antd/es/theme/internal";
import { CloseCircleOutlined } from "@ant-design/icons";
import { FilterKeyToLabelMap } from "../../constants";
import { IFilterType } from "../../../../../../entities";
import { NumericFilterHeader } from "../NumericFilterHeader";
import { FILTER_TYPE_TO_LABEL_PREFIX, MAX_RANGE, MIN_RANGE } from "./constants";

interface IRatingFilter {
  value: IAddFilterButtonProps["rating"];
  onChange: (data: IAddFilterButtonProps["rating"]) => void;
}

export const RatingFilter: FC<IRatingFilter> = ({ value, onChange }) => {
  const [, token] = useToken();
  const [filterType, setFilterType] = useState<IFilterType>("range");

  const [simpleValue, setSimpleValue] = useState<number | undefined>(
    Array.isArray(value?.value) ? undefined : value?.value
  );
  const [rangeValue, setRangeValue] = useState<
    [number | undefined, number | undefined] | undefined
  >(Array.isArray(value?.value) ? value?.value : undefined);

  const [open, setOpen] = useState(!value);

  const handleSetFilterType = (type: IFilterType) => {
    setFilterType((prevType) => {
      if (
        (prevType !== "range" && type === "range") ||
        (prevType === "range" && type !== "range")
      ) {
        setSimpleValue(undefined);
        setRangeValue(undefined);
      }

      return type;
    });
  };

  const handleChangeFrom = (from: number | null) => {
    setRangeValue((prevValue) => {
      const [, to] = prevValue ?? [undefined, undefined];
      return [from ?? undefined, to];
    });
  };

  const handleChangeTo = (to: number | null) => {
    setRangeValue((prevValue) => {
      const [from] = prevValue ?? [undefined, undefined];
      return [from, to ?? undefined];
    });
  };

  const handleChange = (value: number | null) => {
    setSimpleValue(value ?? undefined);
  };

  const handleApply = () => {
    if (disabled) return;

    onChange({
      value:
        filterType === "range"
          ? (rangeValue as [number, number])
          : (simpleValue as number),
      filterType,
    });
    setOpen(false);
  };

  const handleClose = () => {
    onChange(undefined);
    setOpen(false);
  };

  const handleOpenChange = (open: boolean) => {
    if (value) {
      setOpen(open);
    }
  };

  const disabled =
    (filterType === "range" &&
      (!rangeValue || rangeValue.some((value) => value === undefined))) ||
    (!!rangeValue && Number(rangeValue[0]) >= Number(rangeValue[1])) ||
    (filterType !== "range" && !simpleValue);

  const label = !value
    ? FilterKeyToLabelMap["rating"]
    : `${FilterKeyToLabelMap["rating"]}: ${
        Array.isArray(value?.value)
          ? `от ${value.value[0]} до ${value.value[1]}`
          : `${FILTER_TYPE_TO_LABEL_PREFIX}${value}`
      }`;

  return (
    <Dropdown
      open={open}
      onOpenChange={handleOpenChange}
      dropdownRender={() => (
        <Flex
          vertical
          gap={8}
          style={{
            backgroundColor: token.colorBgElevated,
            borderRadius: token.borderRadiusLG,
            boxShadow: token.boxShadowSecondary,
            padding: token.padding,
          }}
        >
          <NumericFilterHeader
            type={filterType}
            onChange={handleSetFilterType}
          />
          {filterType === "range" ? (
            <Flex vertical gap={8}>
              <InputNumber
                value={rangeValue ? rangeValue[0] : undefined}
                type="number"
                style={{ width: "100%" }}
                min={MIN_RANGE}
                max={MAX_RANGE}
                maxLength={1}
                placeholder="Введите значение от"
                onChange={handleChangeFrom}
              />
              <InputNumber
                value={rangeValue ? rangeValue[1] : undefined}
                type="number"
                style={{ width: "100%" }}
                min={MIN_RANGE}
                max={MAX_RANGE}
                maxLength={1}
                placeholder="Введите значение до"
                onChange={handleChangeTo}
              />
            </Flex>
          ) : (
            <InputNumber
              value={simpleValue}
              type="number"
              style={{ width: "100%" }}
              min={MIN_RANGE}
              max={MAX_RANGE}
              maxLength={1}
              placeholder="Введите значение от 0 до 5"
              onChange={handleChange}
            />
          )}
          <Button type="primary" disabled={disabled} onClick={handleApply}>
            Применить
          </Button>
        </Flex>
      )}
    >
      <Button icon={<CloseCircleOutlined onClick={handleClose} />}>
        {label}
      </Button>
    </Dropdown>
  );
};

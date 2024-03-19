import { FC, useState } from "react";
import { Flex, InputNumber } from "antd";
import { IFilterType } from "../../../../../../entities";
import { MAX_RANGE, MIN_RANGE } from "./constants";
import { DefaultFilter } from "../DefaultFilter";
import type { ISpecificFilter } from "../FilterSwitch";

export const RatingFilter: FC<ISpecificFilter<"rating">> = ({
  data,
  onChange,
}) => {
  const [filterType, setFilterType] = useState<IFilterType>(
    data?.filterType ? data.filterType : "range"
  );

  const [simpleValue, setSimpleValue] = useState<number | undefined>(
    Array.isArray(data?.value) ? undefined : data?.value
  );
  const [rangeValue, setRangeValue] = useState<
    [number | undefined, number | undefined] | undefined
  >(Array.isArray(data?.value) ? data?.value : undefined);

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
  };

  const handleClose = () => {
    onChange(undefined);
  };

  const disabled =
    (filterType === "range" &&
      (!rangeValue ||
        rangeValue.some((value) => value === undefined) ||
        Number(rangeValue[0]) >= Number(rangeValue[1]))) ||
    (filterType !== "range" && !simpleValue);

  return (
    <DefaultFilter
      filterKey="rating"
      data={data}
      type={filterType}
      disabled={disabled}
      onApply={handleApply}
      onClose={handleClose}
      onChangeType={handleSetFilterType}
    >
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
    </DefaultFilter>
  );
};

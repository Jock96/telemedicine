import { FC, useState } from "react";
import { Flex, InputNumber, Typography } from "antd";
import { IFilterType } from "../../../../../../entities";
import { DefaultFilter } from "../DefaultFilter";
import type { ISpecificFilter } from "../FilterSwitch";
import { MAX_MONTH, MAX_YEAR, MIN_MONTH, MIN_YEAR } from "./constants";
import { IYearsOfWorkExpirience } from "../../../../../../entities";

export const YearsOfWorkExpirienceFilter: FC<
  ISpecificFilter<"yearsOfWorkExpirience">
> = ({ data, onChange }) => {
  const [filterType, setFilterType] = useState<IFilterType>(
    data?.filterType ? data.filterType : "range"
  );

  const [simpleValue, setSimpleValue] = useState<
    IYearsOfWorkExpirience | undefined
  >(Array.isArray(data?.value) ? undefined : data?.value);

  const [rangeValue, setRangeValue] = useState<
    | [IYearsOfWorkExpirience | undefined, IYearsOfWorkExpirience | undefined]
    | undefined
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

  const handleChangeFrom = (from?: IYearsOfWorkExpirience) => {
    setRangeValue((prevValue) => {
      const [prevFrom, to] = prevValue ?? [undefined, undefined];
      return [{ ...prevFrom, ...from }, to];
    });
  };

  const handleChangeTo = (to?: IYearsOfWorkExpirience) => {
    setRangeValue((prevValue) => {
      const [from, prevTo] = prevValue ?? [undefined, undefined];
      return [from, { ...prevTo, ...to }];
    });
  };

  const handleChange = (value?: IYearsOfWorkExpirience) => {
    setSimpleValue((prevValue) => ({ ...prevValue, ...value }));
  };

  const handleApply = () => {
    if (disabled) return;

    onChange({
      value:
        filterType === "range"
          ? (rangeValue as [IYearsOfWorkExpirience, IYearsOfWorkExpirience])
          : (simpleValue as IYearsOfWorkExpirience),
      filterType,
    });
  };

  const handleClose = () => {
    onChange(undefined);
  };

  const disabled =
    (filterType === "range" &&
      (!rangeValue || rangeValue.some((value) => value === undefined))) ||
    (filterType === "range" &&
      ((rangeValue?.[0]?.years ?? 0) === (rangeValue?.[1]?.years ?? 0)
        ? (rangeValue?.[0]?.months ?? 0) >= (rangeValue?.[1]?.months ?? 0)
        : (rangeValue?.[0]?.years ?? 0) >= (rangeValue?.[1]?.years ?? 0))) ||
    (filterType !== "range" && !simpleValue);

  return (
    <DefaultFilter
      filterKey="yearsOfWorkExpirience"
      data={data}
      type={filterType}
      disabled={disabled}
      onApply={handleApply}
      onClose={handleClose}
      onChangeType={handleSetFilterType}
    >
      {filterType === "range" ? (
        <Flex vertical gap={8}>
          <Flex gap={8} align="center">
            <InputNumber
              value={rangeValue ? rangeValue[0]?.years : undefined}
              type="number"
              style={{ flex: 1 }}
              min={MIN_YEAR}
              max={MAX_YEAR}
              maxLength={2}
              placeholder="0"
              onChange={(years) =>
                handleChangeFrom(years ? { years } : undefined)
              }
            />
            {/* TODO: plural */}
            <Typography.Text>лет</Typography.Text>
            <InputNumber
              value={rangeValue ? rangeValue[0]?.months : undefined}
              type="number"
              style={{ flex: 1 }}
              min={MIN_MONTH}
              max={MAX_MONTH}
              maxLength={2}
              placeholder="0"
              onChange={(months) =>
                handleChangeFrom(months ? { months } : undefined)
              }
            />
            {/* TODO: plural */}
            <Typography.Text>месяцев</Typography.Text>
          </Flex>
          <Flex gap={8} align="center">
            <InputNumber
              value={rangeValue ? rangeValue[1]?.years : undefined}
              type="number"
              style={{ flex: 1 }}
              min={MIN_YEAR}
              max={MAX_YEAR}
              maxLength={2}
              placeholder="0"
              onChange={(years) =>
                handleChangeTo(years ? { years } : undefined)
              }
            />
            {/* TODO: plural */}
            <Typography.Text>лет</Typography.Text>
            <InputNumber
              value={rangeValue ? rangeValue[1]?.months : undefined}
              type="number"
              style={{ flex: 1 }}
              min={MIN_MONTH}
              max={MAX_MONTH}
              maxLength={2}
              placeholder="0"
              onChange={(months) =>
                handleChangeTo(months ? { months } : undefined)
              }
            />
            {/* TODO: plural */}
            <Typography.Text>месяцев</Typography.Text>
          </Flex>
        </Flex>
      ) : (
        <Flex gap={8} align="center">
          <InputNumber
            value={simpleValue ? simpleValue?.years : undefined}
            type="number"
            style={{ flex: 1 }}
            min={MIN_YEAR}
            max={MAX_YEAR}
            maxLength={2}
            placeholder="0"
            onChange={(years) => handleChange(years ? { years } : undefined)}
          />
          {/* TODO: plural */}
          <Typography.Text>лет</Typography.Text>
          <InputNumber
            value={simpleValue ? simpleValue?.months : undefined}
            type="number"
            style={{ flex: 1 }}
            min={MIN_MONTH}
            max={MAX_MONTH}
            maxLength={2}
            placeholder="0"
            onChange={(months) => handleChange(months ? { months } : undefined)}
          />
          {/* TODO: plural */}
          <Typography.Text>месяцев</Typography.Text>
        </Flex>
      )}
    </DefaultFilter>
  );
};

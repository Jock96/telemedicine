import { FC, useState } from "react";
import { DatePicker } from "antd";
import { IFilterType } from "../../../../../../entities";
import { DefaultFilter } from "../DefaultFilter";
import type { ISpecificFilter } from "../FilterSwitch";
import dayjs from "dayjs";
import { DATE_FORMAT } from "../../../../../../constants";

export const NearestWorkTimeFilter: FC<ISpecificFilter<"nearestWorkTime">> = ({
  data,
  onChange,
}) => {
  const [filterType, setFilterType] = useState<IFilterType>(
    data?.filterType ? data.filterType : "range"
  );

  const [simpleValue, setSimpleValue] = useState<string | undefined>(
    Array.isArray(data?.value) ? undefined : data?.value
  );
  const [rangeValue, setRangeValue] = useState<
    [string | undefined, string | undefined] | undefined
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

  const handleChangeRange = (
    _: [dayjs.Dayjs | null, dayjs.Dayjs | null],
    dateStrings: [string, string]
  ) => {
    setRangeValue(
      dateStrings.some((date) => date === "") ? undefined : dateStrings
    );
  };

  const handleChange = (_: dayjs.Dayjs, dateString: string | string[]) => {
    const date = Array.isArray(dateString) ? dateString[0] : dateString;
    setSimpleValue(date === "" ? undefined : date);
  };

  const handleApply = () => {
    if (disabled) return;

    onChange({
      value:
        filterType === "range"
          ? (rangeValue as [string, string])
          : (simpleValue as string),
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
        dayjs(rangeValue[0], DATE_FORMAT).unix() >=
          dayjs(rangeValue[1], DATE_FORMAT).unix())) ||
    (filterType !== "range" && !simpleValue);

  return (
    <DefaultFilter
      filterKey="nearestWorkTime"
      data={data}
      type={filterType}
      disabled={disabled}
      onApply={handleApply}
      onClose={handleClose}
      onChangeType={handleSetFilterType}
    >
      {filterType === "range" ? (
        <DatePicker.RangePicker
          value={
            rangeValue
              ? [
                  dayjs(rangeValue[0], DATE_FORMAT),
                  dayjs(rangeValue[1], DATE_FORMAT),
                ]
              : undefined
          }
          placeholder={["От", "До"]}
          onChange={handleChangeRange}
          format={[DATE_FORMAT, DATE_FORMAT]}
          disabledDate={(date) =>
            date.startOf("day").unix() < dayjs().startOf("day").unix() ||
            date.startOf("day").unix() >
              dayjs().startOf("day").add(1, "year").unix()
          }
        />
      ) : (
        <DatePicker
          value={simpleValue ? dayjs(simpleValue, DATE_FORMAT) : undefined}
          style={{ width: "100%" }}
          placeholder="Введите значение от 0 до 5"
          onChange={handleChange}
          format={DATE_FORMAT}
          disabledDate={(date) =>
            date.startOf("day").unix() < dayjs().startOf("day").unix() ||
            date.startOf("day").unix() >
              dayjs().startOf("day").add(1, "year").unix()
          }
        />
      )}
    </DefaultFilter>
  );
};

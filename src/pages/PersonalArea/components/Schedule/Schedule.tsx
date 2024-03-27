import { FC, useState } from "react";
import { Collapse, Typography, Flex, Radio, Tooltip, Button } from "antd";
import type { RadioChangeEvent } from "antd/es/radio";
import { AddingDayType, ScheduleKey, ScheduleType } from "./constants";
import { WEEK_DAYS, WEEK_SHORT_DAYS } from "../../../../constants";
import { useUserContext } from "../../../../contextes";
import { ISpecialist } from "../../../../entities/specialist";
import { IDayRange, IntRange, IRangeOfDays } from "../../../../entities";
import { generateDayRangeLabel, generateRangeOfDaysLabel } from "./helpers";
import { CloseCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { AdaptiveButton } from "../../../../components/AdaptiveButton/AdaptiveButton";
import dayjs from "dayjs";
import { AddDayModal } from "./components";

export const Schedule: FC = () => {
  const initialActiveKey = window.localStorage.getItem(ScheduleKey);
  const [activeKey, setActiveKey] = useState<string | null>(initialActiveKey);

  const handleChange = (key: string | string[]) => {
    const value = Array.isArray(key) ? key[0] : key;
    setActiveKey(value ? value : null);

    if (value) {
      window.localStorage.setItem(ScheduleKey, value);
    } else {
      window.localStorage.removeItem(ScheduleKey);
    }
  };

  const [dayType, setDayType] = useState(ScheduleType.WORKING_DAY);

  const handleDayTypeChange = ({ target }: RadioChangeEvent) =>
    setDayType(target.value as ScheduleType);

  const { user } = useUserContext<ISpecialist>();

  const { workingDayInfo, dayOffInfo } = user?.workTime ?? {};

  const dayInfo =
    dayType === ScheduleType.WORKING_DAY ? workingDayInfo : dayOffInfo;

  const [removedExtraDays, setRemovedExtraDays] = useState<IDayRange[]>([]);

  const onRemoveExtraDay = (day: IDayRange) => {
    setRemovedExtraDays((prev) => [...prev, day]);
  };

  const onDropRemovedExtraDays = () => {
    setRemovedExtraDays([]);
  };

  const [removedExtraDayRanges, setRemovedExtraDayRanges] = useState<
    IRangeOfDays[]
  >([]);

  const onRemoveExtraDayRange = (range: IRangeOfDays) => {
    setRemovedExtraDayRanges((prev) => [...prev, range]);
  };

  const onDropRemovedExtraDaysRanges = () => {
    setRemovedExtraDayRanges([]);
  };

  const [tempExtraDays, setTempExtraDays] = useState<IDayRange[]>([]);

  const onAddTempExtraDay = (day: IDayRange) => {
    setTempExtraDays((prev) => [...prev, day]);
  };

  const onRemoveTempExtraDay = (day: IDayRange) => {
    setTempExtraDays((prev) =>
      prev.filter(({ from, to }) => from !== day.from && to !== day.to)
    );
  };

  const onDropTempExtraDays = () => {
    setTempExtraDays([]);
  };

  const [tempExtraDayRanges, setTempExtraDayRanges] = useState<IRangeOfDays[]>(
    []
  );

  const onAddTempExtraDayRange = (range: IRangeOfDays) => {
    setTempExtraDayRanges((prev) => [...prev, range]);
  };

  const onRemoveTempExtraDayRange = (range: IRangeOfDays) => {
    setTempExtraDayRanges((prev) =>
      prev.filter(
        ({ from, to }) =>
          from.value !== range.from.value &&
          to.value !== range.to.value &&
          from.allDay !== range.from.allDay &&
          to.allDay !== range.to.allDay
      )
    );
  };

  const onDropTempExtraDayRanges = () => {
    setTempExtraDayRanges([]);
  };

  const [addingDayType, setAddingDayType] = useState<AddingDayType>();

  const onAdd = (type: AddingDayType) => {
    setAddingDayType(type);
  };

  const onCancelAdding = () => {
    setAddingDayType(undefined);
  };

  return (
    <>
      <Collapse
        ghost
        activeKey={activeKey ?? undefined}
        onChange={handleChange}
        items={[
          {
            key: ScheduleKey,
            label: <Typography.Text strong>График работы</Typography.Text>,
            children: (
              <Flex vertical gap={12}>
                <Radio.Group
                  onChange={handleDayTypeChange}
                  value={dayType}
                  defaultValue={ScheduleType.WORKING_DAY}
                  style={{ display: "flex", flexWrap: "wrap" }}
                >
                  <Radio.Button
                    style={{
                      flex: 1,
                      display: "flex",
                      justifyContent: "center",
                    }}
                    value={ScheduleType.WORKING_DAY}
                  >
                    Рабочие
                  </Radio.Button>
                  <Radio.Button
                    style={{
                      flex: 1,
                      display: "flex",
                      justifyContent: "center",
                    }}
                    value={ScheduleType.DAY_OFF}
                  >
                    Выходные
                  </Radio.Button>
                </Radio.Group>
                {dayInfo && (
                  <>
                    <Flex wrap="wrap" gap={8}>
                      {WEEK_SHORT_DAYS.map((day, id) => (
                        <Tooltip key={day} title={WEEK_DAYS[id]}>
                          <Button
                            type={
                              dayInfo.regularWeekDays.includes(
                                id as IntRange<0, 7>
                              )
                                ? "primary"
                                : "default"
                            }
                            block
                            style={{ flex: 1 }}
                          >
                            {day}
                          </Button>
                        </Tooltip>
                      ))}
                    </Flex>
                    <Flex wrap="wrap" gap={8} align="center">
                      <Typography.Text>Дни:</Typography.Text>
                      {!!dayInfo.extraDays.length &&
                        dayInfo.extraDays
                          .filter(
                            (day) =>
                              !removedExtraDays
                                .filter(({ allDay }) => allDay === day.allDay)
                                .some(({ from, to }) =>
                                  day.allDay
                                    ? dayjs(from).unix() ===
                                      dayjs(day.from).unix()
                                    : dayjs(from).unix() ===
                                        dayjs(day.from).unix() &&
                                      dayjs(to).unix() === dayjs(day.to).unix()
                                )
                          )
                          .map((day) => (
                            <AdaptiveButton
                              type="dashed"
                              key={day.from}
                              icon={
                                <CloseCircleOutlined
                                  onClick={() => onRemoveExtraDay(day)}
                                />
                              }
                            >
                              {generateDayRangeLabel(day)}
                            </AdaptiveButton>
                          ))}
                      {!!tempExtraDays.length &&
                        tempExtraDays.map((day) => (
                          <AdaptiveButton
                            type="dashed"
                            key={day.from}
                            icon={
                              <CloseCircleOutlined
                                onClick={() => onRemoveTempExtraDay(day)}
                              />
                            }
                          >
                            {generateDayRangeLabel(day)}
                          </AdaptiveButton>
                        ))}
                      <Button
                        type="text"
                        icon={<PlusOutlined />}
                        onClick={() => onAdd(AddingDayType.ONE)}
                      >
                        Добавить
                      </Button>
                    </Flex>
                    <Flex wrap="wrap" gap={8} align="center">
                      <Typography.Text>Период дней:</Typography.Text>
                      {!!dayInfo.extraDayRanges.length &&
                        dayInfo.extraDayRanges
                          .filter(
                            (dayRange) =>
                              !removedExtraDayRanges.some(
                                ({ from, to }) =>
                                  dayjs(from.value).unix() ===
                                    dayjs(dayRange.from.value).unix() &&
                                  dayjs(to.value).unix() ===
                                    dayjs(dayRange.to.value).unix() &&
                                  from.allDay === dayRange.from.allDay &&
                                  to.allDay === dayRange.to.allDay
                              )
                          )
                          .map((range) => (
                            <AdaptiveButton
                              type="dashed"
                              key={range.from.value}
                              icon={
                                <CloseCircleOutlined
                                  onClick={() => onRemoveExtraDayRange(range)}
                                />
                              }
                            >
                              {generateRangeOfDaysLabel(range)}
                            </AdaptiveButton>
                          ))}
                      {!!tempExtraDayRanges.length &&
                        tempExtraDayRanges.map((range) => (
                          <AdaptiveButton
                            type="dashed"
                            key={range.from.value}
                            icon={
                              <CloseCircleOutlined
                                onClick={() => onRemoveTempExtraDayRange(range)}
                              />
                            }
                          >
                            {generateRangeOfDaysLabel(range)}
                          </AdaptiveButton>
                        ))}
                      <Button
                        type="text"
                        icon={<PlusOutlined />}
                        onClick={() => onAdd(AddingDayType.RANGE)}
                      >
                        Добавить
                      </Button>
                    </Flex>
                  </>
                )}
              </Flex>
            ),
          },
        ]}
      />
      <AddDayModal
        type={addingDayType}
        onCancel={onCancelAdding}
        onAddOneDay={onAddTempExtraDay}
        existingDays={[...(dayInfo?.extraDays ?? []), ...tempExtraDays]}
      />
    </>
  );
};

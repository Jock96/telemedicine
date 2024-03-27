import { FC, useMemo, useState } from "react";
import {
  Calendar,
  Modal,
  Typography,
  Flex,
  Badge,
  Radio,
  Dropdown,
  Button,
  DropdownProps,
  TimePicker,
} from "antd";
import { SelectInfo } from "antd/es/calendar/generateCalendar";
import {
  DATE_FORMAT,
  HOURS,
  MINUTES,
  TIME_FORMAT,
  TIME_SELECT_TYPE,
} from "../../constants";
import "./RegisterCalendar.css";
import type { IRegisterCalendarProps } from "./types";
import type { RadioChangeEvent } from "antd/es/radio";
import type { ISpecialization } from "../../entities";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { generateSegmentLabel, generateSegments } from "./helpers";
import { useMediaContext } from "../../contextes";
import { CardWrapper } from "../CardWrapper";

dayjs.extend(utc);

export const RegisterCalendar: FC<IRegisterCalendarProps> = ({
  visiteDates,
  slots,
  workDuration,
  wrapInCard = true,
}) => {
  const { isMobile } = useMediaContext();

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<dayjs.Dayjs>();

  const handleSelect = (date: dayjs.Dayjs, selectInfo: SelectInfo) => {
    if (selectInfo.source === "year" || selectInfo.source === "month") return;

    setOpen(true);
    setDate(date);
  };

  const [timeSelectType, setTimeSelectType] = useState(
    TIME_SELECT_TYPE.RECOMEND
  );

  const handleChange = ({ target }: RadioChangeEvent) =>
    setTimeSelectType(target.value as TIME_SELECT_TYPE);

  const specializations = workDuration.map(
    ({ specialization }) => specialization
  );

  const [selectedSpecialization, setSelectedSpecialization] =
    useState<ISpecialization>();

  const menu: DropdownProps["menu"] = {
    items: specializations.map((specialization) => ({
      key: specialization,
      label: specialization,
    })),
    selectable: true,
    selectedKeys: [selectedSpecialization as string],
    onClick: ({ key }) => setSelectedSpecialization(key as ISpecialization),
  };

  const handleCancel = () => {
    setSelectedSpecialization(undefined);
    setTimeSelectType(TIME_SELECT_TYPE.RECOMEND);
    setDate(undefined);
    setOpen(false);
  };

  const [currentWorkDuration] = selectedSpecialization
    ? workDuration.filter(
        ({ specialization }) => specialization === selectedSpecialization
      )
    : [undefined];

  const selectedDateSlots = useMemo(
    () =>
      date
        ? slots
            .filter(
              ({ date: slotDate }) =>
                dayjs(slotDate).startOf("day").unix() ===
                dayjs(date).clone().startOf("day").unix()
            )
            .map(({ value }) =>
              value.map(({ from, to }) => ({
                from: dayjs(from),
                to: dayjs(to),
              }))
            )
            .flat()
        : [],
    [date, slots]
  );

  const durationHours = currentWorkDuration?.value.hours ?? 0;
  const durationMinutes = currentWorkDuration?.value.minutes ?? 0;

  const segments = useMemo(
    () =>
      generateSegments({ durationHours, durationMinutes, selectedDateSlots }),
    [durationHours, durationMinutes, selectedDateSlots]
  );

  const availableStartHours = Array.from(
    new Set(
      selectedDateSlots
        .map(({ from, to }) => {
          const fromHour = from.get("hours");
          const toHour = to.get("hours");

          const hours = [];

          for (let hour = fromHour; hour + durationHours < toHour; hour++) {
            hours.push(hour);
          }

          return hours;
        })
        .flat()
    )
  );

  const onApplyTime = ([start, end]: [
    dayjs.Dayjs | null,
    dayjs.Dayjs | null
  ]) => {
    // TODO:
    handleCancel();
  };

  const [startTime, setStartTime] = useState<dayjs.Dayjs>();
  const [endTime, setEndTime] = useState<dayjs.Dayjs>();

  const handleTimeConfirm = ([start, end]: [
    dayjs.Dayjs | null,
    dayjs.Dayjs | null
  ]) => {
    if (!!start && !!startTime && startTime.unix() !== start.unix()) {
      setStartTime(start);
      setEndTime(undefined);
      return;
    }

    if (end) {
      setStartTime(undefined);
      setEndTime(undefined);
      onApplyTime([start, end]);
      return;
    }

    if (start) {
      setStartTime(start);
    }
  };

  return (
    <CardWrapper wrap={wrapInCard}>
      <Typography.Title level={4} style={{ textAlign: "center" }}>
        Запись к специалисту
      </Typography.Title>
      <Calendar
        fullscreen={!isMobile}
        validRange={[
          dayjs().utcOffset(0).startOf("day"),
          dayjs()
            .utcOffset(0)
            .add(1, "year")
            .set("hour", 23)
            .set("minute", 59)
            .set("second", 59),
        ]}
        onSelect={handleSelect}
        cellRender={(date) =>
          !isMobile
            ? visiteDates
                .filter(
                  (visiteDate) =>
                    date.date() === dayjs(visiteDate).date() &&
                    date.month() === dayjs(visiteDate).month()
                )
                .map((visiteDate) => (
                  <Flex key={visiteDate} vertical gap={2}>
                    <Flex gap={2}>
                      <Badge color="green" />
                      <Typography.Text ellipsis>
                        {dayjs(visiteDate).format(TIME_FORMAT)}
                      </Typography.Text>
                    </Flex>
                  </Flex>
                ))
            : null
        }
        className="specialistCalendar"
      />
      <Modal
        open={open}
        centered
        onCancel={handleCancel}
        width={isMobile ? "100%" : "75%"}
        footer={null}
        title={`Выбрать время записи на ${date?.format(DATE_FORMAT)}`}
      >
        <Flex vertical gap={8}>
          <Dropdown menu={menu} trigger={["click"]}>
            <Button>
              {selectedSpecialization
                ? `Выбранная специалиазция: ${selectedSpecialization}`
                : "Выберите специализацию"}
            </Button>
          </Dropdown>
          {selectedSpecialization ? (
            !segments.length ? (
              <Typography.Text style={{ textAlign: "center" }} type="danger">
                По выбранной специализации на указанную дату нет доступных
                записей
              </Typography.Text>
            ) : (
              <Radio.Group
                onChange={handleChange}
                value={timeSelectType}
                defaultValue={TIME_SELECT_TYPE.RECOMEND}
                style={{ display: "flex" }}
              >
                <Radio.Button
                  style={{ flex: 1, display: "flex", justifyContent: "center" }}
                  value={TIME_SELECT_TYPE.RECOMEND}
                >
                  Рекомендуемое
                </Radio.Button>
                <Radio.Button
                  style={{ flex: 1, display: "flex", justifyContent: "center" }}
                  value={TIME_SELECT_TYPE.SELF}
                >
                  Самостоятельно
                </Radio.Button>
              </Radio.Group>
            )
          ) : null}
          {timeSelectType === TIME_SELECT_TYPE.RECOMEND &&
            !!segments.length && (
              <Flex wrap="wrap" gap={8}>
                {segments.map((segment) => (
                  <Button
                    key={segment.start.toString()}
                    type="dashed"
                    onClick={() => onApplyTime([segment.start, segment.end])}
                    style={{ flex: 1 }}
                  >
                    {generateSegmentLabel(segment)}
                  </Button>
                ))}
              </Flex>
            )}
          {timeSelectType === TIME_SELECT_TYPE.SELF && !!segments.length && (
            <TimePicker.RangePicker
              value={[startTime, endTime]}
              placeholder={["С", "по"]}
              format={TIME_FORMAT}
              onOk={handleTimeConfirm}
              disabledTime={(_, range) => ({
                disabledHours: () =>
                  range === "start"
                    ? HOURS.filter(
                        (hour) => !availableStartHours.includes(hour)
                      )
                    : !startTime ||
                      MINUTES.filter(
                        (minute) =>
                          minute !==
                          (startTime.get("minutes") + durationMinutes >= 60
                            ? 60 - (startTime.get("minutes") + durationMinutes)
                            : startTime.get("minutes") + durationMinutes)
                      ).length === MINUTES.length
                    ? HOURS
                    : HOURS.filter(
                        (hour) =>
                          hour !==
                          startTime.get("hours") +
                            durationHours +
                            (startTime.get("minutes") + durationMinutes >= 60
                              ? 1
                              : 0)
                      ),
                disabledMinutes: () =>
                  range === "start"
                    ? []
                    : !startTime
                    ? MINUTES
                    : MINUTES.filter(
                        (minute) =>
                          minute !==
                          (startTime.get("minutes") + durationMinutes >= 60
                            ? 60 - (startTime.get("minutes") + durationMinutes)
                            : startTime.get("minutes") + durationMinutes)
                      ),
              })}
            />
          )}
        </Flex>
      </Modal>
    </CardWrapper>
  );
};

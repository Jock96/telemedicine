import { FC, useState } from "react";
import {
  Calendar,
  Modal,
  Card,
  Typography,
  Flex,
  Badge,
  Radio,
  Dropdown,
  Button,
  DropdownProps,
} from "antd";
import { SelectInfo } from "antd/es/calendar/generateCalendar";
import { DATE_FORMAT, TIME_FORMAT } from "../../constants";
import "./RegisterCalendar.css";
import type { IRegisterCalendarProps } from "./types";
import { TIME_SELECT_TYPE } from "./constants";
import type { RadioChangeEvent } from "antd/es/radio";
import type { ISpecialization } from "../../entities";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export const RegisterCalendar: FC<IRegisterCalendarProps> = ({
  visiteDates,
  slots,
  workDuration,
}) => {
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
    setOpen(false);
    setDate(undefined);
  };

  const [currentWorkDuration] = workDuration.filter(
    ({ specialization }) => specialization === selectedSpecialization
  );

  const selectedDateSlots = date
    ? slots
        .filter(
          ({ date: slotDate }) =>
            dayjs(slotDate).startOf("day").unix() ===
            dayjs(date).clone().startOf("day").unix()
        )
        .map(({ value }) =>
          value.map(({ from, to }) => ({
            from: dayjs(from, TIME_FORMAT),
            to: dayjs(to, TIME_FORMAT),
          }))
        )
        .flat()
    : [];

  const durationHours = currentWorkDuration.value.hours ?? 0
  const durationMinutes = currentWorkDuration.value.minutes ?? 0

  // TODO: разделить на сегменты

  return (
    <Card>
      <Typography.Title level={5} style={{ textAlign: "center" }}>
        Запись к специалисту
      </Typography.Title>
      <Calendar
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
          visiteDates
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
        }
        className="specialistCalendar"
      />
      <Modal
        open={open}
        centered
        onCancel={handleCancel}
        width="75%"
        footer={null}
        title={`Выбрать время записи на ${date?.format(DATE_FORMAT)}`}
      >
        <Flex vertical gap={8}>
          <Dropdown menu={menu}>
            <Button>
              {selectedSpecialization
                ? `Выбранная специалиазция: ${selectedSpecialization}`
                : "Выберите специализацию"}
            </Button>
          </Dropdown>
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
        </Flex>
      </Modal>
    </Card>
  );
};

import { FC, useState } from "react";
import {
  Typography,
  Flex,
  Button,
  Modal,
  DatePicker,
  TimePicker,
  Checkbox,
} from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { AddingDayType } from "../../constants";
import {
  DATE_FORMAT,
  HOURS,
  MINUTES,
  TIME_FORMAT,
} from "../../../../../../constants";
import dayjs from "dayjs";
import { IAddDayModalProps } from "./types";

export const AddDayModal: FC<IAddDayModalProps> = ({
  type,
  onCancel,
  onAddOneDay,
  existingDays,
}) => {
  // TODO: проверять на то что дата уже существует

  const [addingDay, setAddingDay] = useState<dayjs.Dayjs>();
  const [addingDayFromTime, setAddingDayFromTime] = useState<dayjs.Dayjs>();
  const [addingDayToTime, setAddingDayToTime] = useState<dayjs.Dayjs>();

  const [isAllDayChecked, setIsAllDayChecked] = useState(true);

  const handleIsAllDayChange = (event: CheckboxChangeEvent) => {
    setIsAllDayChecked(event.target.checked);
    setAddingDayFromTime(undefined);
    setAddingDayToTime(undefined);
  };

  const addingDayExist = isAllDayChecked
    ? !!existingDays.filter(
        ({ allDay, from }) =>
          !!allDay &&
          addingDay?.startOf("day").unix() === dayjs(from).startOf("day").unix()
      ).length
    : !!existingDays.filter(
        ({ allDay, from, to }) =>
          !allDay &&
          addingDay
            ?.startOf("day")
            .set(
              "hour",
              addingDayFromTime?.get("hour") ?? addingDay?.get("hour") ?? 0
            )
            .set(
              "minute",
              addingDayFromTime?.get("minute") ?? addingDay?.get("minute") ?? 0
            )
            .toString() === from &&
          addingDay
            ?.startOf("day")
            .set(
              "hour",
              addingDayToTime?.get("hour") ?? addingDay?.get("hour") ?? 0
            )
            .set(
              "minute",
              addingDayToTime?.get("minute") ?? addingDay?.get("minute") ?? 0
            )
            .toString() === to
      ).length;

  const addingDisabled =
    type === AddingDayType.ONE
      ? isAllDayChecked
        ? !addingDay
        : !addingDay || !addingDayFromTime || !addingDayToTime
      : false;

  const handleCancel = () => {
    setIsAllDayChecked(true);
    setAddingDay(undefined);
    setAddingDayFromTime(undefined);
    setAddingDayToTime(undefined);
    // TODO:
    onCancel();
  };

  const handleConfirm = () => {
    if (type === AddingDayType.ONE) {
      const from = dayjs(addingDay)
        .set(
          "hour",
          addingDayFromTime?.get("hour") ?? addingDay?.get("hour") ?? 0
        )
        .set(
          "minute",
          addingDayFromTime?.get("minute") ?? addingDay?.get("minute") ?? 0
        )
        .toString();
      const to = dayjs(addingDay)
        .set(
          "hour",
          addingDayToTime?.get("hour") ?? addingDay?.get("hour") ?? 0
        )
        .set(
          "minute",
          addingDayToTime?.get("minute") ?? addingDay?.get("minute") ?? 0
        )
        .toString();

      onAddOneDay({
        from,
        to,
        allDay: isAllDayChecked ? true : undefined,
      });
    } else {
      // TODO:
    }

    handleCancel();
  };

  // TODO: range of days

  return (
    <Modal
      open={!!type}
      footer={null}
      onCancel={handleCancel}
      centered
      title={
        type === AddingDayType.ONE ? "Выберите день" : "Выберите период дней"
      }
      width="100%"
    >
      <Flex vertical gap={8} wrap="wrap">
        {type === AddingDayType.ONE && (
          <Flex vertical gap={8}>
            <Flex gap={8} wrap="wrap" align="center">
              <DatePicker
                value={addingDay}
                style={{ flex: 1 }}
                placeholder={dayjs().format(DATE_FORMAT)}
                onChange={setAddingDay}
                format={DATE_FORMAT}
                disabledDate={(date) =>
                  date.startOf("day").unix() < dayjs().startOf("day").unix() ||
                  date.startOf("day").unix() >
                    dayjs().startOf("day").add(1, "year").unix()
                }
              />
              <Typography.Text disabled={isAllDayChecked}>с</Typography.Text>
              <TimePicker
                value={addingDayFromTime}
                style={{ flex: 1 }}
                placeholder="00:00"
                onChange={setAddingDayFromTime}
                format={TIME_FORMAT}
                disabled={isAllDayChecked}
                showNow={false}
                disabledTime={() => ({
                  disabledHours: () =>
                    addingDayToTime
                      ? HOURS.filter(
                          (hour) => hour > addingDayToTime.get("hour")
                        )
                      : [],
                  disabledMinutes: (hour) =>
                    addingDayToTime
                      ? addingDayToTime.get("hour") === hour
                        ? MINUTES.filter(
                            (minute) => minute >= addingDayToTime.get("minute")
                          )
                        : []
                      : [],
                })}
              />
              <Typography.Text disabled={isAllDayChecked}>по</Typography.Text>
              <TimePicker
                value={addingDayToTime}
                style={{ flex: 1 }}
                placeholder="23:59"
                onChange={setAddingDayToTime}
                format={TIME_FORMAT}
                disabled={isAllDayChecked}
                showNow={false}
                disabledTime={() => ({
                  disabledHours: () =>
                    addingDayFromTime
                      ? HOURS.filter(
                          (hour) => hour < addingDayFromTime.get("hour")
                        )
                      : [],
                  disabledMinutes: (hour) =>
                    addingDayFromTime
                      ? addingDayFromTime.get("hour") === hour
                        ? MINUTES.filter(
                            (minute) =>
                              minute <= addingDayFromTime.get("minute")
                          )
                        : []
                      : [],
                })}
              />
            </Flex>
            <Checkbox checked={isAllDayChecked} onChange={handleIsAllDayChange}>
              Весь день
            </Checkbox>
          </Flex>
        )}
        <Button
          type="primary"
          disabled={addingDisabled || addingDayExist}
          onClick={handleConfirm}
        >
          Применить
        </Button>
        {addingDayExist && (
          <Typography.Text style={{ textAlign: "center" }} type="danger">
            {type === AddingDayType.ONE
              ? "Выбранный день уже был добавлен"
              : "Выбранный перод дней уже был добавлен"}
          </Typography.Text>
        )}
      </Flex>
    </Modal>
  );
};

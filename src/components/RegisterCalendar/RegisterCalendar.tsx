import { FC, useState } from "react";
import { Calendar, Modal } from "antd";
import { SelectInfo } from "antd/es/calendar/generateCalendar";
import dayjs from "dayjs";
import { DATE_FORMAT } from "../../constants";
import "./RegisterCalendar.css";

export const RegisterCalendar: FC = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<dayjs.Dayjs>();

  const handleSelect = (date: dayjs.Dayjs, selectInfo: SelectInfo) => {
    if (selectInfo.source === "year" || selectInfo.source === "month") return;

    setOpen(true);
    setDate(date);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Calendar
        validRange={[dayjs(), dayjs().add(1, "year")]}
        onSelect={handleSelect}
        className="specialistCalendar"
      />
      <Modal
        open={open}
        centered
        onCancel={handleCancel}
        footer={null}
        title={`Запись на ${date?.format(DATE_FORMAT)}`}
      />
    </>
  );
};

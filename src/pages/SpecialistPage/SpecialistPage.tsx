import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { Calendar, Card, Space, Modal, Typography } from "antd";
import { SelectInfo } from "antd/es/calendar/generateCalendar";
import { SpecialistCard, Page } from "../../components";
import { SPECIALISTS_LIST } from "../../mocks";
import { NotFoundPage } from "../NotFoundPage";
import dayjs from "dayjs";
import "./SpecialistPage.css";

export const SpecialistPage: FC = () => {
  const { id: parmaId } = useParams();
  const medik = SPECIALISTS_LIST.find(({ id }) => id === parmaId);

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<dayjs.Dayjs>()

  const handleSelect = (date: dayjs.Dayjs, selectInfo: SelectInfo) => {
    if (selectInfo.source === "year" || selectInfo.source === "month") return;

    setOpen(true);
    setDate(date);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  if (!medik) {
    return <NotFoundPage />;
  }

  return (
    <Page>
      <Space direction="vertical" style={{ width: "100%" }} size={24}>
        <SpecialistCard {...medik} showLess />
        <Card>
          <Typography.Title level={5} style={{ textAlign: "center" }}>
            Запись к специалисту
          </Typography.Title>
          <Calendar
            validRange={[dayjs(), dayjs().add(1, "year")]}
            onSelect={handleSelect}
            className="specialistCalendar"
          />
        </Card>
      </Space>
      <Modal
        open={open}
        centered
        onCancel={handleCancel}
        footer={null}
        title={`Запись на ${date?.format('DD.MM.YYYY')}`}
      />
    </Page>
  );
};

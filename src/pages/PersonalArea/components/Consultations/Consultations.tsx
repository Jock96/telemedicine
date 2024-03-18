import { FC, useState } from "react";
import { Calendar, Table, Switch, Flex, Typography, Badge, Modal } from "antd";
import type { SelectInfo } from "antd/es/calendar/generateCalendar";
import { generateColumns } from "./constants";
import { CONSULTATIONS } from "../../../../mocks/index";
import "./Consultations.css";
import dayjs from "dayjs";
import type { IConsultation } from "../../../../entities";
import { DATE_FORMAT, TIME_FORMAT } from "../../../../constants";
import { SpecialistCard } from "../../../../components";

export const Consultations: FC = () => {
  const specialist = false; // TODO: после авторизации проверять кто и менять вью (надо ли ?)

  const onDeleteConsultation = (id: IConsultation["id"]) => {
    // TODO:
  };

  const onChangeConsultationDate = (id: IConsultation["id"]) => {
    // TODO:
  };

  const columns = generateColumns({
    specialist,
    onDeleteConsultation,
    onChangeConsultationDate,
  });

  const [isCalendar, setIsCalendar] = useState(true);
  const toggleView = () => setIsCalendar((prev) => !prev);

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

  const [nearestConsultationTime, latestConsultationTime] = CONSULTATIONS.sort(
    ({ time: firstTime }, { time: secondTime }) =>
      dayjs(firstTime).unix() - dayjs(secondTime).unix()
  )
    .filter((_, index) => index === 0 || index === CONSULTATIONS.length - 1)
    .map(({ time }) => dayjs(time));

  const validRange: [dayjs.Dayjs, dayjs.Dayjs] = [
    nearestConsultationTime
      .clone()
      .set("hour", 0)
      .set("minute", 0)
      .set("second", 0),
    latestConsultationTime
      .clone()
      .set("hour", 23)
      .set("minute", 59)
      .set("second", 59),
  ];

  const [selectedConsultationId, setSelectedConsultationId] =
    useState<IConsultation["id"]>();

  const showUserInfo = (id: IConsultation["id"]) => {
    setSelectedConsultationId(id);
  };

  const closeUserInfo = () => {
    setSelectedConsultationId(undefined);
  };

  const selectedSpecialist = CONSULTATIONS.find(
    ({ id }) => id === selectedConsultationId
  )?.specialist;

  return (
    <Flex vertical gap={12}>
      <Typography.Text strong>Предстоящие консультации:</Typography.Text>
      <Switch
        checked={isCalendar}
        checkedChildren="Календарь"
        unCheckedChildren="Таблица"
        onChange={toggleView}
        style={{ width: "fit-content" }}
      />
      {isCalendar ? (
        <>
          <Calendar
            className="consultationsCalendar"
            validRange={validRange}
            cellRender={(date) =>
              CONSULTATIONS.filter(
                ({ time }) =>
                  date.date() === dayjs(time).date() &&
                  date.month() === dayjs(time).month()
              ).map(({ id, time }) => (
                <Flex key={id} vertical gap={2}>
                  <Flex gap={2}>
                    <Badge color="green" />
                    <Typography.Text ellipsis>
                      {dayjs(time).format(TIME_FORMAT)}
                    </Typography.Text>
                  </Flex>
                </Flex>
              ))
            }
            onSelect={handleSelect}
            disabledDate={(date) =>
              !CONSULTATIONS.filter(
                ({ time }) =>
                  date.date() === dayjs(time).date() &&
                  date.month() === dayjs(time).month()
              ).length
            }
          />
          <Modal
            open={open}
            centered
            onCancel={handleCancel}
            width="75%"
            footer={null}
            title={`Записи на ${date?.format(DATE_FORMAT)}`}
          >
            <Table
              style={{ cursor: "pointer" }}
              columns={columns}
              // TODO:
              loading={false}
              // TODO:
              dataSource={CONSULTATIONS.filter(
                ({ time }) => date?.date() === dayjs(time).date()
              )}
              onRow={({ id }) => ({
                onClick: () => showUserInfo(id),
              })}
            />
          </Modal>
        </>
      ) : (
        <Table
          style={{ cursor: "pointer" }}
          onRow={({ id }) => ({
            onClick: () => showUserInfo(id),
          })}
          columns={columns}
          // TODO:
          loading={false}
          // TODO:
          dataSource={CONSULTATIONS}
        />
      )}
      {selectedSpecialist && (
        <Modal
          open={!!selectedConsultationId}
          centered
          onCancel={closeUserInfo}
          footer={null}
        >
          <SpecialistCard {...selectedSpecialist} showLess />
        </Modal>
      )}
    </Flex>
  );
};

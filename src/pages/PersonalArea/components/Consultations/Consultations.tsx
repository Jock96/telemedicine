import { FC, useState } from "react";
import { Calendar, Switch, Flex, Typography, Badge, Modal } from "antd";
import type { SelectInfo } from "antd/es/calendar/generateCalendar";
import {
  PersonalAreaConsultationIsCalendarKey,
  PersonalAreaConsultationIsCalendarSpecialistKey,
  PersonalAreaConsultationSpecialistFilterKey,
} from "./constants";
import { CONSULTATIONS } from "../../../../mocks/index";
import "./Consultations.css";
import { DATE_FORMAT, TIME_FORMAT } from "../../../../constants";
import { Filters } from "../../../../components";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useMediaContext, useUserContext } from "../../../../contextes";
import { ConsultationsList } from "./components";

dayjs.extend(utc);

export const Consultations: FC = () => {
  const { isMobile } = useMediaContext();
  const { user } = useUserContext();

  // TODO: получать с сервера
  const consultations = CONSULTATIONS;

  const userCalendarKey = user?.isSpecialist
    ? PersonalAreaConsultationIsCalendarSpecialistKey
    : PersonalAreaConsultationIsCalendarKey;

  const isCalendarFromLocalStorage =
    window.localStorage.getItem(userCalendarKey);

  const initIsCalendar: boolean = isCalendarFromLocalStorage
    ? JSON.parse(isCalendarFromLocalStorage)
    : true;

  const [isCalendar, setIsCalendar] = useState(initIsCalendar);

  const toggleView = () =>
    setIsCalendar((prev) => {
      window.localStorage.setItem(userCalendarKey, JSON.stringify(!prev));
      return !prev;
    });

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

  const [nearestConsultationTime, latestConsultationTime] = consultations
    .sort(
      ({ time: firstTime }, { time: secondTime }) =>
        dayjs(firstTime).unix() - dayjs(secondTime).unix()
    )
    .filter((_, index) => index === 0 || index === consultations.length - 1)
    .map(({ time }) => dayjs(time));

  const validRange: [dayjs.Dayjs, dayjs.Dayjs] = [
    nearestConsultationTime
      .clone()
      .utcOffset(0)
      .set("hour", 0)
      .set("minute", 0)
      .set("second", 0),
    latestConsultationTime
      .clone()
      .utcOffset(0)
      .set("hour", 23)
      .set("minute", 59)
      .set("second", 59),
  ];

  return (
    <Flex vertical gap={12}>
      <Typography.Text strong>Предстоящие консультации</Typography.Text>
      <Switch
        checked={isCalendar}
        checkedChildren="Календарь"
        unCheckedChildren="Список"
        onChange={toggleView}
        style={{ width: "fit-content" }}
      />
      {isCalendar ? (
        <>
          <Calendar
            fullscreen={!isMobile}
            className="consultationsCalendar"
            validRange={validRange}
            cellRender={(date) =>
              !isMobile
                ? consultations
                    .filter(
                      ({ time }) =>
                        date.date() === dayjs(time).date() &&
                        date.month() === dayjs(time).month()
                    )
                    .map(({ id, time }) => (
                      <Flex key={id} vertical gap={2}>
                        <Flex gap={2}>
                          <Badge color="green" />
                          <Typography.Text ellipsis>
                            {dayjs(time).format(TIME_FORMAT)}
                          </Typography.Text>
                        </Flex>
                      </Flex>
                    ))
                : null
            }
            onSelect={handleSelect}
            disabledDate={(date) =>
              !consultations.filter(
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
            <ConsultationsList
              data={consultations.filter(
                ({ time }) => date?.unix() === dayjs(time).unix()
              )}
            />
          </Modal>
        </>
      ) : (
        <>
          <Filters
            wrapInCard={!isMobile}
            hideSort={!isMobile}
            key={
              user?.isSpecialist
                ? PersonalAreaConsultationSpecialistFilterKey
                : undefined
            }
            forbiddenSortBy={[
              "rating",
              "workDuration",
              "yearsOfWorkExpirience",
            ]}
            forbiddenFilters={["yearsOfWorkExpirience", "rating"]}
          />
          <ConsultationsList data={consultations} />
        </>
      )}
    </Flex>
  );
};

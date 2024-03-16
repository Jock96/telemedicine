import { FC, useState } from "react";
import { Calendar, Table, Switch, Flex, Typography, Badge } from "antd";
import { generateColumns } from "./constants";
import { CONSULTATIONS } from "../../../../mocks/index";
import "./Consultations.css";
import dayjs from "dayjs";
import { getFullName } from "../../../../helpers";

export const Consultations: FC = () => {
  const specialist = false; // TODO: после авторизации проверять кто
  const columns = generateColumns(specialist);

  const [isCalendar, setIsCalendar] = useState(true);

  const toggleView = () => setIsCalendar((prev) => !prev);

  const [nearestConsultationTime, latestConsultationTime] = CONSULTATIONS.sort(
    ({ time: firstTime }, { time: secondTime }) =>
      dayjs(firstTime).unix() - dayjs(secondTime).unix()
  )
    .filter((_, index) => index === 0 || index === CONSULTATIONS.length - 1)
    .map(({ time }) => dayjs(time));

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
        <Calendar
          className="consultationsCalendar"
          validRange={[
            nearestConsultationTime,
            latestConsultationTime.add(1, "day"),
          ]}
          dateCellRender={(date) =>
            CONSULTATIONS.filter(
              ({ time }) => date.date() === dayjs(time).date()
            ).map((consultation) => (
              <Flex vertical gap={2}>
                <Flex gap={2}>
                  <Badge color="red" />
                  <Typography.Text ellipsis>
                    {getFullName(consultation)}
                  </Typography.Text>
                </Flex>
              </Flex>
            ))
          }
          // TODO: выводить модалку с информацией о записи
          onSelect={() => {}}
        />
      ) : (
        <Table
          columns={columns}
          // TODO:
          loading={false}
          // TODO:
          dataSource={CONSULTATIONS}
          // TODO: pagination
        />
      )}
    </Flex>
  );
};

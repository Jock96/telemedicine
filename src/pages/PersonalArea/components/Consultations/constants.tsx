import { ColumnsType } from "antd/es/table";
import type { IConsultation } from "../../../../entities/consultation";
import { Avatar, Tag } from "antd";
import { getFullName } from "../../../../helpers";
import dayjs from "dayjs";

// TODO: генерация разных колонок
export const generateColumns = (
  specialist?: boolean
): ColumnsType<IConsultation> => [
  {
    title: "",
    dataIndex: "photoUrl",
    key: "photoUrl",
    render: (photoUrl) => <Avatar src={photoUrl} />,
  },
  {
    title: "ФИО",
    dataIndex: "id",
    key: "id",
    render: (_, consultation) => getFullName(consultation),
  },
  {
    title: "Специализация",
    dataIndex: "specialization",
    key: "specialization",
    render: (specialization) => <Tag>{specialization}</Tag>,
  },
  {
    title: "Время записи",
    dataIndex: "time",
    key: "time",
    sorter: (
      { time: firstTime }: IConsultation,
      { time: secondTime }: IConsultation
    ) => dayjs(firstTime).unix() - dayjs(secondTime).unix(),
    render: (time) => dayjs(time).format("DD.MM.YYYY").toString(),
  },
];

import { ColumnsType } from "antd/es/table";
import type { IConsultation } from "../../../../entities";
import { Avatar, Tag, Button, Tooltip } from "antd";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import { getFullName } from "../../../../helpers";
import dayjs from "dayjs";
import type { IColumnGenerator } from "./types";
import { DATE_AND_TIME_FORMAT } from "../../../../constants";

// TODO: генерация разных колонок
export const generateColumns = ({
  specialist,
  onDeleteConsultation,
  onChangeConsultationDate,
}: IColumnGenerator): ColumnsType<IConsultation> => [
  {
    title: "",
    dataIndex: "specialist",
    key: "photoUrl",
    render: (specialist: IConsultation["specialist"]) =>
      specialist ? <Avatar src={specialist?.photoUrl} /> : null,
  },
  {
    title: "ФИО",
    dataIndex: "id",
    key: "id",
    render: (_, consultation) =>
      consultation?.specialist ? getFullName(consultation.specialist) : null,
  },
  {
    title: "Специализация",
    dataIndex: "specialization",
    key: "specialization",
    render: (specialization: IConsultation["specialization"]) => (
      <Tag>{specialization}</Tag>
    ),
  },
  {
    title: "Время записи",
    dataIndex: "time",
    key: "time",
    sorter: (
      { time: firstTime }: IConsultation,
      { time: secondTime }: IConsultation
    ) => dayjs(firstTime).unix() - dayjs(secondTime).unix(),
    render: (time: IConsultation["time"]) =>
      time ? dayjs(time).format(DATE_AND_TIME_FORMAT).toString() : null,
  },
  {
    title: "",
    dataIndex: "id",
    key: "edit",
    render: (id: IConsultation["id"]) => (
      <Tooltip title="Изменить дату">
        <Button
          type="text"
          icon={<EditOutlined />}
          onClick={() => onChangeConsultationDate(id)}
        />
      </Tooltip>
    ),
  },
  {
    title: "",
    dataIndex: "id",
    key: "cancel",
    render: (id: IConsultation["id"]) => (
      <Tooltip title="Отменить консультацию">
        <Button
          type="text"
          icon={<CloseOutlined />}
          onClick={() => onDeleteConsultation(id)}
        />
      </Tooltip>
    ),
  },
];

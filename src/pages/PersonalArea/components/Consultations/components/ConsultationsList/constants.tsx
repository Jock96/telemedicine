import { ColumnsType } from "antd/es/table";
import { Avatar, Tag, Button, Tooltip, Popconfirm } from "antd";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import type { IColumnGenerator } from "../../types";
import type { IConsultation } from "../../../../../../entities";
import { getFullName } from "../../../../../../helpers";
import { DATE_AND_TIME_FORMAT } from "../../../../../../constants";

// TODO: генерация разных колонок
export const generateColumns = ({
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
      <Tooltip trigger={["hover"]} title="Изменить дату">
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
      <Tooltip trigger={["hover"]} title="Отменить консультацию">
        <Popconfirm
          title="Отменить консультацию"
          description="Вы уверены что хотите отменить консультацию?"
          onConfirm={() => onDeleteConsultation(id)}
          okText="Да"
          cancelText="Нет"
        >
          <Button
            type="text"
            icon={<CloseOutlined />}
            danger
          />
        </Popconfirm>
      </Tooltip>
    ),
  },
];

import { FC, useState } from "react";
import {
  Table,
  Modal,
  List,
  Avatar,
  Flex,
  Typography,
  Tag,
  Button,
  Pagination,
  Popconfirm,
} from "antd";
import { EditOutlined, CloseOutlined } from "@ant-design/icons";
import type { IConsultationsListProps } from "./types";
import type { IConsultation } from "../../../../../../entities";
import { generateColumns } from "./constants";
import { SpecialistCard } from "../../../../../../components";
import { useMediaContext, useUserContext } from "../../../../../../contextes";
import { getFullName } from "../../../../../../helpers";
import { DATE_AND_TIME_FORMAT } from "../../../../../../constants";
import dayjs from "dayjs";

export const ConsultationsList: FC<IConsultationsListProps> = ({ data }) => {
  const { isMobile } = useMediaContext();
  const { user } = useUserContext();

  const onDeleteConsultation = (id: IConsultation["id"]) => {
    // TODO:
  };

  const onChangeConsultationDate = (id: IConsultation["id"]) => {
    // TODO:
  };

  const columns = generateColumns({
    onDeleteConsultation,
    onChangeConsultationDate,
  });

  const [selectedConsultationId, setSelectedConsultationId] =
    useState<IConsultation["id"]>();

  const showUserInfo = (id: IConsultation["id"]) => {
    setSelectedConsultationId(id);
  };

  const closeUserInfo = () => {
    setSelectedConsultationId(undefined);
  };

  const selectedSpecialist = data.find(
    ({ id }) => id === selectedConsultationId
  )?.specialist;

  return (
    <>
      {isMobile ? (
        <Flex vertical gap={8}>
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={({ specialist, specialization, time, id }) => (
              <>
                <List.Item
                  onClick={() => {
                    if (user?.isSpecialist) return;

                    showUserInfo(id);
                  }}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={specialist?.photoUrl} />}
                    title={specialist ? getFullName(specialist) : null}
                    description={
                      <Flex vertical gap={8}>
                        <Flex gap={4} wrap="wrap">
                          <Typography.Text>Специализация:</Typography.Text>
                          <Tag>{specialization}</Tag>
                        </Flex>

                        <Flex gap={4} wrap="wrap">
                          <Typography.Text>Время записи:</Typography.Text>
                          <Typography.Text>
                            {time
                              ? dayjs(time)
                                  .format(DATE_AND_TIME_FORMAT)
                                  .toString()
                              : null}
                          </Typography.Text>
                        </Flex>
                      </Flex>
                    }
                  />
                </List.Item>
                <List.Item>
                  <Flex vertical gap={4} style={{ width: "100%" }}>
                    <Button
                      type="dashed"
                      icon={<EditOutlined />}
                      onClick={() => onChangeConsultationDate(id)}
                    >
                      Изменить дату
                    </Button>
                    <Popconfirm
                      title="Отменить консультацию"
                      description="Вы уверены что хотите отменить консультацию?"
                      onConfirm={() => onDeleteConsultation(id)}
                      okText="Да"
                      cancelText="Нет"
                    >
                      <Button
                        block
                        danger
                        type="dashed"
                        icon={<CloseOutlined />}
                      >
                        Отменить
                      </Button>
                    </Popconfirm>
                  </Flex>
                </List.Item>
              </>
            )}
          />
          {/* TODO: */}
          <Pagination
            size="small"
            total={500}
            showSizeChanger={false}
            style={{ alignSelf: "center", display: "flex" }}
          />
        </Flex>
      ) : (
        <Table
          style={{ cursor: "pointer" }}
          onRow={({ id }) => ({
            onClick: ({ target }: any) => {
              if (
                target.localName === "path" ||
                target.localName === "button" ||
                target.localName === "svg" ||
                (target.localName === "span" && !target.className) ||
                user?.isSpecialist
              )
                return;

              showUserInfo(id);
            },
          })}
          columns={columns}
          // TODO:
          loading={false}
          // TODO:
          dataSource={data}
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
    </>
  );
};

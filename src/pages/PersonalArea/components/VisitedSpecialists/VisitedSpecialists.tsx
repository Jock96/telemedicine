import { FC, useState } from "react";
import {
  Collapse,
  Typography,
  Flex,
  List,
  Avatar,
  Tag,
  Modal,
  Button,
  Tooltip,
  Popconfirm,
} from "antd";
import {
  EditOutlined,
  CloseOutlined,
  HistoryOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { VISITED_SPECIALISTS } from "../../../../mocks";
import { getFullName } from "../../../../helpers";
import { ISpecialist } from "../../../../entities";
import {
  AdaptiveButton,
  CommentModal,
  Filters,
  SpecialistCard,
} from "../../../../components";
import { RegisterCalendar } from "../../../../components/RegisterCalendar/RegisterCalendar";
import { visitedSpecialistsKey } from "./constants";
import { useFilters } from "../../../../components";
import { useMediaContext } from "../../../../contextes";

export const VisitedSpecialists: FC = () => {
  const { isMobile } = useMediaContext();

  // TODO: получать с сервера
  // TODO: для специалиста какое инфо тут нужно
  const visitedSpecialist = VISITED_SPECIALISTS

  const [selectedSpecialistId, setSelectedSpecialistId] =
    useState<ISpecialist["id"]>();

  const showUserInfo = (id: ISpecialist["id"]) => {
    setSelectedSpecialistId(id);
  };

  const closeUserInfo = () => {
    setSelectedSpecialistId(undefined);
  };

  const selectedSpecialist = visitedSpecialist.find(
    ({ id }) => id === selectedSpecialistId
  );

  const [commentedSpecialistId, setCommentedSpecialistId] =
    useState<ISpecialist["id"]>();

  const showCommentsModal = (id: ISpecialist["id"]) => {
    setCommentedSpecialistId(id);
  };

  const closeCommentsModal = () => {
    setCommentedSpecialistId(undefined);
  };

  const commentedSpecialist = visitedSpecialist.find(
    ({ id }) => id === commentedSpecialistId
  );

  const onDelete = (id: ISpecialist["id"]) => {
    // TODO:
  };

  const [registerSpecialistId, setRegisterSpecialistId] =
    useState<ISpecialist["id"]>();

  const showRegisterCalendar = (id: ISpecialist["id"]) => {
    setRegisterSpecialistId(id);
  };

  const hideRegisterCalendar = () => {
    setRegisterSpecialistId(undefined);
  };

  const { hasFilters } = useFilters(visitedSpecialistsKey);

  if (!visitedSpecialist.length) return null;

  return (
    <>
      <Collapse
        ghost
        defaultActiveKey={hasFilters ? visitedSpecialistsKey : undefined}
        items={[
          {
            key: visitedSpecialistsKey,
            label: (
              <Typography.Text strong>
                Специалисты которых вы посетили
              </Typography.Text>
            ),
            children: (
              <Flex vertical>
                <Filters
                  wrapInCard={!isMobile}
                  filterKey={visitedSpecialistsKey}
                  hideSort
                  forbiddenFilters={[
                    "nearestWorkTime",
                    "rating",
                    "yearsOfWorkExpirience",
                  ]}
                />
                <List
                  itemLayout="horizontal"
                  style={{ cursor: "pointer" }}
                  dataSource={VISITED_SPECIALISTS}
                  renderItem={(specialist) => (
                    <>
                      <List.Item
                        style={
                          isMobile
                            ? { justifyContent: "center", gap: 8 }
                            : undefined
                        }
                        extra={
                          !isMobile && (
                            <Flex>
                              {!!registerSpecialistId &&
                              specialist.id === registerSpecialistId ? (
                                <Tooltip trigger={["hover"]} title="Закрыть форму записи">
                                  <Button
                                    type="text"
                                    icon={<StopOutlined />}
                                    onClick={() => hideRegisterCalendar()}
                                  />
                                </Tooltip>
                              ) : (
                                <Tooltip trigger={["hover"]} title="Записаться повторно">
                                  <Button
                                    type="text"
                                    icon={<HistoryOutlined />}
                                    onClick={() =>
                                      showRegisterCalendar(specialist.id)
                                    }
                                  />
                                </Tooltip>
                              )}
                              {/* TODO: если комментарий уже есть - показывать изменить комментарий */}
                              <Tooltip trigger={["hover"]} title="Оставить комментарий">
                                <Button
                                  type="text"
                                  icon={<EditOutlined />}
                                  onClick={() =>
                                    showCommentsModal(specialist.id)
                                  }
                                />
                              </Tooltip>
                              <Tooltip trigger={["hover"]} title="Удалить из истории посещения">
                                <Popconfirm
                                  title="Удалить из истории посещения"
                                  description="Вы уверены что хотите удалить специалиста из истории посещения?"
                                  onConfirm={() => onDelete(specialist.id)}
                                  okText="Да"
                                  cancelText="Нет"
                                >
                                  <Button
                                    type="text"
                                    danger
                                    icon={<CloseOutlined />}
                                  />
                                </Popconfirm>
                              </Tooltip>
                            </Flex>
                          )
                        }
                      >
                        <div
                          style={{ display: "flex", width: "100%" }}
                          onClick={() => showUserInfo(specialist.id)}
                        >
                          <List.Item.Meta
                            avatar={<Avatar src={specialist.photoUrl} />}
                            title={getFullName(specialist)}
                            description={
                              <Flex wrap="wrap" gap={4}>
                                {specialist.specializations.map(
                                  (specialization) => (
                                    <Tag key={specialization}>
                                      {specialization}
                                    </Tag>
                                  )
                                )}
                              </Flex>
                            }
                          />
                        </div>
                      </List.Item>
                      {isMobile && (
                        <List.Item style={{ justifyContent: "center" }}>
                          <Flex vertical gap={4} style={{ width: "100%" }}>
                            {!!registerSpecialistId &&
                            specialist.id === registerSpecialistId ? (
                              <AdaptiveButton
                                block
                                type="dashed"
                                icon={<StopOutlined />}
                                onClick={() => hideRegisterCalendar()}
                              >
                                Закрыть форму записи
                              </AdaptiveButton>
                            ) : (
                              <AdaptiveButton
                                block
                                type="dashed"
                                icon={<HistoryOutlined />}
                                onClick={() =>
                                  showRegisterCalendar(specialist.id)
                                }
                              >
                                Записаться повторно
                              </AdaptiveButton>
                            )}
                            {/* TODO: если комментарий уже есть - показывать изменить комментарий */}
                            <AdaptiveButton
                              block
                              type="dashed"
                              icon={<EditOutlined />}
                              onClick={() => showCommentsModal(specialist.id)}
                            >
                              Оставить комментарий
                            </AdaptiveButton>
                            <Popconfirm
                              title="Удалить из истории посещения"
                              description="Вы уверены что хотите удалить специалиста из истории посещения?"
                              onConfirm={() => onDelete(specialist.id)}
                              okText="Да"
                              cancelText="Нет"
                            >
                              <AdaptiveButton
                                block
                                danger
                                type="dashed"
                                icon={<CloseOutlined />}
                                onClick={() => onDelete(specialist.id)}
                              >
                                Удалить
                              </AdaptiveButton>
                            </Popconfirm>
                          </Flex>
                        </List.Item>
                      )}
                      {!!registerSpecialistId &&
                        specialist.id === registerSpecialistId && (
                          <List.Item>
                            <RegisterCalendar
                              wrapInCard={!isMobile}
                              visiteDates={specialist.visiteDates}
                              slots={specialist.slots}
                              workDuration={specialist.workDuration}
                            />
                          </List.Item>
                        )}
                    </>
                  )}
                />
              </Flex>
            ),
          },
        ]}
      />
      {selectedSpecialist && (
        <Modal
          open={!!selectedSpecialistId}
          centered
          onCancel={closeUserInfo}
          footer={null}
        >
          <SpecialistCard {...selectedSpecialist} showLess />
        </Modal>
      )}
      {commentedSpecialist && (
        <CommentModal
          open={!!commentedSpecialistId}
          onCancel={closeCommentsModal}
        />
      )}
    </>
  );
};

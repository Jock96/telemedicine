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
import { CommentModal, Filters, SpecialistCard } from "../../../../components";
import { RegisterCalendar } from "../../../../components/RegisterCalendar/RegisterCalendar";
import { visitedSpecialistsKey } from "./constants";
import { useFilters } from "../../../../components";
import { useMediaContext } from "../../../../contextes";

export const VisitedSpecialists: FC = () => {
  const { isMobile } = useMediaContext();

  const [selectedSpecialistId, setSelectedSpecialistId] =
    useState<ISpecialist["id"]>();

  const showUserInfo = (id: ISpecialist["id"]) => {
    setSelectedSpecialistId(id);
  };

  const closeUserInfo = () => {
    setSelectedSpecialistId(undefined);
  };

  const selectedSpecialist = VISITED_SPECIALISTS.find(
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

  const commentedSpecialist = VISITED_SPECIALISTS.find(
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

  if (!VISITED_SPECIALISTS.length) return null;

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
                Специалисты которых вы посетили:
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
                                <Tooltip title="Закрыть форму записи">
                                  <Button
                                    type="text"
                                    icon={<StopOutlined />}
                                    onClick={() => hideRegisterCalendar()}
                                  />
                                </Tooltip>
                              ) : (
                                <Tooltip title="Записаться повторно">
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
                              <Tooltip title="Оставить комментарий">
                                <Button
                                  type="text"
                                  icon={<EditOutlined />}
                                  onClick={() =>
                                    showCommentsModal(specialist.id)
                                  }
                                />
                              </Tooltip>
                              <Tooltip title="Удалить из истории посещения">
                                <Button
                                  type="text"
                                  danger
                                  icon={<CloseOutlined />}
                                  onClick={() => onDelete(specialist.id)}
                                />
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
                        <List.Item>
                          <Flex vertical gap={4}>
                            {!!registerSpecialistId &&
                            specialist.id === registerSpecialistId ? (
                              <Button
                                block
                                type="dashed"
                                icon={<StopOutlined />}
                                onClick={() => hideRegisterCalendar()}
                              >
                                Закрыть форму записи
                              </Button>
                            ) : (
                              <Button
                                block
                                type="dashed"
                                icon={<HistoryOutlined />}
                                onClick={() =>
                                  showRegisterCalendar(specialist.id)
                                }
                              >
                                Записаться повторно
                              </Button>
                            )}
                            {/* TODO: если комментарий уже есть - показывать изменить комментарий */}
                            <Button
                              block
                              type="dashed"
                              icon={<EditOutlined />}
                              onClick={() => showCommentsModal(specialist.id)}
                            >
                              Оставить комментарий
                            </Button>
                            <Button
                              block
                              danger
                              type="dashed"
                              icon={<CloseOutlined />}
                              onClick={() => onDelete(specialist.id)}
                            >
                              Удалить
                            </Button>
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

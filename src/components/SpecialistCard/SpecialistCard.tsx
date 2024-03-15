import Card from "antd/es/card/Card";
import { FC, MouseEventHandler, useRef } from "react";
import {
  Avatar,
  Collapse,
  List,
  Rate,
  Tag,
  Typography,
  Image,
  Flex,
} from "antd";
import { HeartOutlined } from "@ant-design/icons";
import { ISpecialist } from "../../entities";
import { useNavigate } from "react-router-dom";
import "./SpecialistCard.css";
import { Routes } from "../../constants";
import { getFullName } from "../../helpers";

export const SpecialistCard: FC<ISpecialist & { showLess?: boolean }> = ({
  id,
  photoUrl,
  firstName,
  lastName,
  patronymic,
  comments,
  specializations,
  yearsOfWorkExpirience,
  nearestWorkTime,
  showLess,
}) => {
  const collapseRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
    if (collapseRef.current?.contains(event.target as Node)) return;
    navigate(`${Routes.Specialist}/${id}`);
  };
  const rating =
    comments.reduce((acc, { rating }) => acc + rating, 0) / comments.length;
  const fullName = getFullName({ firstName, lastName, patronymic });
  return (
    <Card onClick={handleClick} style={{ width: "100%", cursor: "pointer" }}>
      <Flex vertical style={{ width: "100%" }}>
        <Flex align="flex-start" style={{ width: "100%" }}>
          <Image src={photoUrl} preview={false} />
          <Flex
            vertical
            gap={12}
            justify="flex-start"
            style={{ height: "100%" }}
          >
            <Typography.Text strong>{fullName}</Typography.Text>
            <Rate
              disabled
              defaultValue={rating}
              character={<HeartOutlined />}
            />
            <Flex gap={4}>
              {/* TODO: множественное число */}
              <Typography.Text>Специализации:</Typography.Text>
              {specializations.map((specialization, index) => (
                <Tag key={index}>{specialization}</Tag>
              ))}
            </Flex>
            <Flex gap={4}>
              <Typography.Text>Стаж работы:</Typography.Text>
              <Typography.Text>{yearsOfWorkExpirience}</Typography.Text>
            </Flex>
            {!showLess && (
              <Flex gap={4}>
                <Typography.Text>Ближайшая запись:</Typography.Text>
                <Typography.Text>{nearestWorkTime}</Typography.Text>
              </Flex>
            )}
          </Flex>
        </Flex>
        {!!comments.length && !showLess && (
          <Collapse
            ghost
            className="commentsContainer"
            ref={collapseRef}
            items={[
              {
                key: "1",
                label: "Комментарии:",
                children: (
                  <List
                    itemLayout="horizontal"
                    dataSource={comments}
                    renderItem={({ fromWho, rating, value, photoUrl }) => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar src={photoUrl} />}
                          title={fromWho}
                          description={
                            <Flex vertical>
                              <Rate
                                disabled
                                defaultValue={rating}
                                character={<HeartOutlined />}
                              />
                              <Typography.Text>{value}</Typography.Text>
                            </Flex>
                          }
                        />
                      </List.Item>
                    )}
                  />
                ),
              },
            ]}
          />
        )}
      </Flex>
    </Card>
  );
};

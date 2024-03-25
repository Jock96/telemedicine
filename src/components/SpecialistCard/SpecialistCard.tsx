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
import { useNavigate, useLocation } from "react-router-dom";
import "./SpecialistCard.css";
import { Routes } from "../../constants";
import { getFullName } from "../../helpers";
import { getYearsOfWorkExpirience } from "../../helpers/getYearsOfWorkExpirience";
import { useMediaContext } from "../../contextes";

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
  const { isMobile } = useMediaContext();
  const collapseRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
    if (collapseRef.current?.contains(event.target as Node)) return;
    navigate(`${Routes.Specialist}/${id}`, { state: { prevUrl: pathname } });
  };
  const rating = comments.length
    ? comments.reduce((acc, { rating }) => acc + rating, 0) / comments.length
    : 0;
  const fullName = getFullName({ firstName, lastName, patronymic });
  return (
    <Card
      onClick={handleClick}
      style={{ width: "100%", cursor: "pointer", border: "none" }}
    >
      <Flex vertical style={{ width: "100%" }}>
        <Flex
          align={isMobile ? "center" : "flex-start"}
          style={{ width: "100%" }}
          vertical={isMobile}
          gap={8}
        >
          {isMobile && <Typography.Text strong>{fullName}</Typography.Text>}
          <Image
            src={photoUrl}
            preview={false}
            style={{ width: isMobile ? "200px" : "300px" }}
          />
          <Flex vertical gap={12} style={{ height: "100%" }}>
            {!isMobile && <Typography.Text strong>{fullName}</Typography.Text>}
            <Flex
              align="center"
              gap={8}
              style={isMobile ? { alignSelf: "center" } : undefined}
              wrap="wrap"
            >
              <Rate
                disabled
                defaultValue={Number(rating.toFixed(2))}
                character={<HeartOutlined />}
              />
              <Typography.Text strong>{rating.toFixed(2)}</Typography.Text>
            </Flex>
            <Flex gap={4} wrap="wrap">
              {/* TODO: множественное число */}
              <Typography.Text>Специализации:</Typography.Text>
              {specializations.map((specialization) => (
                <Tag key={specialization}>{specialization}</Tag>
              ))}
            </Flex>
            <Flex gap={4} wrap="wrap">
              <Typography.Text>Стаж работы:</Typography.Text>
              <Typography.Text>
                {getYearsOfWorkExpirience(yearsOfWorkExpirience)}
              </Typography.Text>
            </Flex>
            {!showLess && (
              <Flex gap={4} wrap="wrap">
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

import { FC } from "react";
import { useParams } from "react-router-dom";
import { Card, Flex, Typography } from "antd";
import { SpecialistCard, Page, RegisterCalendar } from "../../components";
import { SPECIALISTS_LIST } from "../../mocks";
import { NotFoundPage } from "../NotFoundPage";

export const SpecialistPage: FC = () => {
  const { id: parmaId } = useParams();
  const specialist = SPECIALISTS_LIST.find(({ id }) => id === parmaId);

  if (!specialist) {
    return <NotFoundPage />;
  }

  return (
    <Page>
      <Flex vertical style={{ width: "100%" }} gap={24}>
        <SpecialistCard {...specialist} showLess />
        <Card>
          <Typography.Title level={5} style={{ textAlign: "center" }}>
            Запись к специалисту
          </Typography.Title>
          <RegisterCalendar />
        </Card>
      </Flex>
    </Page>
  );
};

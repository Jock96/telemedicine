import { FC } from "react";
import { Card, Flex } from "antd";
import { Page } from "../../components";
import { SPECIALISTS_LIST } from "../../mocks";
import { CommonInfo, Consultations, PaymentMethods, VisitedSpecialists } from "./components";

export const PersonalArea: FC = () => {
  // TODO:
  const user = SPECIALISTS_LIST[0];
  return (
    <Page removeHeader>
      <Flex vertical style={{ width: "100%" }} gap={24}>
        <Card>
          <CommonInfo {...user} />
        </Card>
        <Card>
          <PaymentMethods />
        </Card>
        <Card>
          <Consultations />
        </Card>
        <Card>
          {/* TODO: только для пользователя */}
          <VisitedSpecialists />
        </Card>
      </Flex>
    </Page>
  );
};

import { FC } from "react";
import { Card, Flex } from "antd";
import { Page } from "../../components";
import {
  CommonInfo,
  Consultations,
  PaymentMethods,
  Schedule,
  Specializations,
  VisitedSpecialists,
} from "./components";
import { useUserContext } from "../../contextes";

export const PersonalArea: FC = () => {
  const { user } = useUserContext();

  if (!user) return null;

  return (
    <Page removeHeader>
      <Flex vertical style={{ width: "100%" }} gap={24}>
        <Card>
          <CommonInfo {...user} />
        </Card>
        {user.isSpecialist && (
          <>
            <Card>
              <Specializations />
            </Card>
            <Card>
              <Schedule />
            </Card>
          </>
        )}
        <Card>
          <PaymentMethods />
        </Card>
        <Card>
          <Consultations />
        </Card>
        {!user.isSpecialist && (
          <Card>
            <VisitedSpecialists />
          </Card>
        )}
      </Flex>
    </Page>
  );
};

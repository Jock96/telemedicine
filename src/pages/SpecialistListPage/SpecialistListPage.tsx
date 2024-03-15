import { FC } from "react";
import { Flex, Pagination, Typography } from "antd";
import { SPECIALISTS_LIST } from "../../mocks";
import { Page, SpecialistCard } from "../../components";

export const SpecialistListPage: FC = () => {
  return (
    <Page>
      <Flex vertical style={{ width: "100%" }} align="center" gap={24}>
        <Typography.Title level={1}>Список специалистов</Typography.Title>
        {SPECIALISTS_LIST.map((medik) => (
          <SpecialistCard key={medik.id} {...medik} />
        ))}
        <Pagination total={500} showSizeChanger={false} />
      </Flex>
    </Page>
  );
};

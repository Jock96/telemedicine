import { FC } from "react";
import { Flex, Pagination, Typography } from "antd";
import { SPECIALISTS_LIST } from "../../mocks";
import { Filters, Page, SpecialistCard } from "../../components";

export const SpecialistListPage: FC = () => {
  return (
    <Page>
      <Flex vertical style={{ width: "100%" }} align="center" gap={24}>
        <Typography.Title level={1}>Список специалистов</Typography.Title>
        <Filters />
        {SPECIALISTS_LIST.map((specialist) => (
          <SpecialistCard key={specialist.id} {...specialist} />
        ))}
        <Pagination total={500} showSizeChanger={false} />
      </Flex>
    </Page>
  );
};

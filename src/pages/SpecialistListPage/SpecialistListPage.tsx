import { FC } from "react";
import { Flex, Pagination, Typography } from "antd";
import { SPECIALISTS_LIST } from "../../mocks";
import { Filters, Page, SpecialistCard } from "../../components";
import { useMediaContext } from "../../contextes";

export const SpecialistListPage: FC = () => {
  const { isMobile } = useMediaContext();
  return (
    <Page>
      <Flex vertical style={{ width: "100%" }} align="center" gap={24}>
        <Typography.Title level={1}>Список специалистов</Typography.Title>
        <Filters />
        {SPECIALISTS_LIST.map((specialist) => (
          <SpecialistCard key={specialist.id} {...specialist} />
        ))}
        {/* TODO: */}
        <Pagination
          size={isMobile ? "small" : undefined}
          total={500}
          showSizeChanger={false}
        />
      </Flex>
    </Page>
  );
};

import { FC } from "react";
import { Collapse, Typography } from "antd";

export const PaymentMethods: FC = () => (
  <Collapse
    ghost
    items={[
      {
        key: "1",
        label: <Typography.Text strong>Способы оплаты:</Typography.Text>,
        children: (
          <>
            {/* TODO: Добавить способы оплаты */}
            Способы оплаты
          </>
        ),
      },
    ]}
  />
);

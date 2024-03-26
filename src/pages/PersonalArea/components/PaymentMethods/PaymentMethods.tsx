import { FC, useState } from "react";
import { Collapse, Typography } from "antd";
import { PaymentMethodsKey, PaymentMethodsSpecialistKey } from "./constants";
import { useUserContext } from "../../../../contextes";

export const PaymentMethods: FC = () => {
  const { user } = useUserContext();

  const userActiveKey = user?.isSpecialist
    ? PaymentMethodsSpecialistKey
    : PaymentMethodsKey;

  const initialActiveKey = window.localStorage.getItem(userActiveKey);
  const [activeKey, setActiveKey] = useState<string | null>(initialActiveKey);

  const handleChange = (key: string | string[]) => {
    const value = Array.isArray(key) ? key[0] : key;
    setActiveKey(value ? value : null);

    if (value) {
      window.localStorage.setItem(userActiveKey, value);
    } else {
      window.localStorage.removeItem(userActiveKey);
    }
  };

  return (
    <Collapse
      ghost
      activeKey={activeKey ?? undefined}
      onChange={handleChange}
      items={[
        {
          key: userActiveKey,
          label: (
            <Typography.Text strong>{`Способы${
              user?.isSpecialist ? " получения" : ""
            } оплаты`}</Typography.Text>
          ),
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
};

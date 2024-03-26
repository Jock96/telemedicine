import { FC, useState } from "react";
import { Collapse, Typography, Flex, Radio } from "antd";
import type { RadioChangeEvent } from "antd/es/radio";
import { ScheduleKey, ScheduleType } from "./constants";

export const Schedule: FC = () => {
  const initialActiveKey = window.localStorage.getItem(ScheduleKey);
  const [activeKey, setActiveKey] = useState<string | null>(initialActiveKey);

  const handleChange = (key: string | string[]) => {
    const value = Array.isArray(key) ? key[0] : key;
    setActiveKey(value ? value : null);

    if (value) {
      window.localStorage.setItem(ScheduleKey, value);
    } else {
      window.localStorage.removeItem(ScheduleKey);
    }
  };

  const [dayType, setDayType] = useState(ScheduleType.DAY_OFF);

  const handleDayTypeChange = ({ target }: RadioChangeEvent) =>
    setDayType(target.value as ScheduleType);

  return (
    <Collapse
      ghost
      activeKey={activeKey ?? undefined}
      onChange={handleChange}
      items={[
        {
          key: ScheduleKey,
          label: <Typography.Text strong>График работы</Typography.Text>,
          children: (
            <Flex vertical gap={8}>
              <Radio.Group
                onChange={handleDayTypeChange}
                value={dayType}
                defaultValue={ScheduleType.DAY_OFF}
                style={{ display: "flex" }}
              >
                <Radio.Button
                  style={{ flex: 1, display: "flex", justifyContent: "center" }}
                  value={ScheduleType.DAY_OFF}
                >
                  Выходные
                </Radio.Button>
                <Radio.Button
                  style={{ flex: 1, display: "flex", justifyContent: "center" }}
                  value={ScheduleType.WORKING_DAY}
                >
                  Рабочие дни
                </Radio.Button>
              </Radio.Group>
            </Flex>
          ),
        },
      ]}
    />
  );
};

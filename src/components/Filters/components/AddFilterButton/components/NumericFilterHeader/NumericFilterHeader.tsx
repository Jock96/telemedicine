import { FC } from "react";
import { Button, Flex, Tooltip, Radio } from "antd";
import {
  LeftOutlined,
  DoubleLeftOutlined,
  SwapOutlined,
  DoubleRightOutlined,
  RightOutlined,
} from "@ant-design/icons";
import type { RadioChangeEvent } from "antd/es/radio";
import type { NumericFilterHeaderProps } from "./types";

export const NumericFilterHeader: FC<NumericFilterHeaderProps> = ({
  onChange,
  type,
}) => {
  const handleChange = ({ target }: RadioChangeEvent) => {
    onChange(target.value);
  };

  const handleClick = () => {
    onChange("range");
  };

  return (
    <Flex vertical gap={8}>
      <Radio.Group
        onChange={handleChange}
        value={type}
        style={{ display: "flex" }}
      >
        <Tooltip trigger={["hover"]} title="Меньше">
          <Radio.Button
            value="less"
            style={{ flex: 1, display: "flex", justifyContent: "center" }}
          >
            <LeftOutlined />
          </Radio.Button>
        </Tooltip>
        <Tooltip trigger={["hover"]} title="Меньше или равно">
          <Radio.Button
            value="less-or-equal"
            style={{ flex: 1, display: "flex", justifyContent: "center" }}
          >
            <DoubleLeftOutlined />
          </Radio.Button>
        </Tooltip>
        <Tooltip trigger={["hover"]} title="Равно">
          <Radio.Button
            value="equal"
            style={{ flex: 1, display: "flex", justifyContent: "center" }}
          >
            <SwapOutlined />
          </Radio.Button>
        </Tooltip>
        <Tooltip trigger={["hover"]} title="Больше или равно">
          <Radio.Button
            value="more-or-equal"
            style={{ flex: 1, display: "flex", justifyContent: "center" }}
          >
            <DoubleRightOutlined />
          </Radio.Button>
        </Tooltip>
        <Tooltip trigger={["hover"]} title="Больше">
          <Radio.Button
            value="more"
            style={{ flex: 1, display: "flex", justifyContent: "center" }}
          >
            <RightOutlined />
          </Radio.Button>
        </Tooltip>
      </Radio.Group>
      <Button
        type={type === "range" ? "primary" : "text"}
        block
        onClick={handleClick}
      >
        Диапазон
      </Button>
    </Flex>
  );
};

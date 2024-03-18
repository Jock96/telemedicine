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
      <Radio.Group onChange={handleChange} value={type}>
        <Tooltip title="Меньше">
          <Radio.Button value="less">
            <LeftOutlined />
          </Radio.Button>
        </Tooltip>
        <Tooltip title="Меньше или равно">
          <Radio.Button value="less-or-equal">
            <DoubleLeftOutlined />
          </Radio.Button>
        </Tooltip>
        <Tooltip title="Равно">
          <Radio.Button value="equal">
            <SwapOutlined />
          </Radio.Button>
        </Tooltip>
        <Tooltip title="Больше или равно">
          <Radio.Button value="more-or-equal">
            <DoubleRightOutlined />
          </Radio.Button>
        </Tooltip>
        <Tooltip title="Больше">
          <Radio.Button value="more">
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

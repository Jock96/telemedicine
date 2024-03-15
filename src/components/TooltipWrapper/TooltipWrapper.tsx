import { FC, ComponentProps } from "react";
import { Tooltip } from "antd";

export const TooltipWrapper: FC<
  ComponentProps<typeof Tooltip> & { wrap?: boolean }
> = (props) =>
  props.wrap ? (
    <Tooltip {...props}>{props.children}</Tooltip>
  ) : (
    <>{props.children}</>
  );

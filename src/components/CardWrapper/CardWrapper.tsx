import { FC, ComponentProps } from "react";
import { Card } from "antd";

export const CardWrapper: FC<
  ComponentProps<typeof Card> & { wrap?: boolean }
> = (props) =>
  props.wrap ? (
    <Card {...props}>{props.children}</Card>
  ) : (
    <>{props.children}</>
  );

import { ComponentProps, FC } from "react";
import { Layout } from "antd";

export const LayoutContent: FC<ComponentProps<typeof Layout.Content>> = (
  props
) => (
  <Layout.Content style={{ padding: "16px 48px 24px 48px" }} {...props}>
    {props.children}
  </Layout.Content>
);

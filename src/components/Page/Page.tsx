import { ComponentProps, FC } from "react";
import { Layout } from "antd";
import { LayoutContent } from "../LayoutContent";
import { LayoutHeader } from "../LayoutHeader";

export const Page: FC<
  ComponentProps<typeof LayoutContent> & { removeHeader?: boolean }
> = (props) => (
  <Layout>
    {!props.removeHeader && <LayoutHeader />}
    <LayoutContent {...props}>{props.children}</LayoutContent>
  </Layout>
);

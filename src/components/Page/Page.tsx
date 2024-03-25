import { ComponentProps, FC, useState } from "react";
import { Layout, FloatButton } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { LayoutContent } from "../LayoutContent";
import { LayoutHeader } from "../LayoutHeader";
import { useNavigate, useLocation } from "react-router-dom";
import { Routes } from "../../constants";
import { GO_BACK_OFFSET } from "./constants";

export const Page: FC<
  ComponentProps<typeof LayoutContent> & { removeHeader?: boolean }
> = (props) => {
  const navigate = useNavigate();
  const { pathname, state } = useLocation();

  const goBack = () => {
    navigate(state?.prevUrl ?? Routes.Main);
  };

  const isGoBackExist = pathname !== Routes.Main;

  const [headerHeight, setHeaderHeight] = useState(0);
  const callbackRef = (value: HTMLElement | null) => {
    if (value?.clientHeight) setHeaderHeight(value.clientHeight);
  };

  return (
    <Layout>
      {!props.removeHeader && <LayoutHeader ref={callbackRef} />}
      <LayoutContent {...props}>
        {isGoBackExist && (
          <FloatButton
            style={{
              left: GO_BACK_OFFSET,
              top: 4 * GO_BACK_OFFSET + headerHeight,
            }}
            icon={<ArrowLeftOutlined />}
            onClick={goBack}
          />
        )}
        {props.children}
      </LayoutContent>
    </Layout>
  );
};

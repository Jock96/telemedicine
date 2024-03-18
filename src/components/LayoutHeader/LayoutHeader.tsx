import { ComponentProps, FC, forwardRef } from "react";
import { Avatar, Layout, Flex, Typography, Dropdown } from "antd";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { NotificationOutlined } from "@ant-design/icons";
import { photoUrl } from "../../mocks";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../constants";
import { TooltipWrapper } from "../TooltipWrapper";

export const LayoutHeader: FC<ComponentProps<typeof Layout.Header>> =
  forwardRef((props, ref) => {
    const navigate = useNavigate();
    const handleClick = () => {
      navigate(Routes.PersonalArea);
    };
    // TODO:
    const notifications: ItemType[] = [];
    return (
      <Layout.Header
        {...props}
        ref={ref}
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10000,
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Flex
          justify="center"
          align="center"
          gap={8}
          onClick={handleClick}
          style={{ cursor: "pointer" }}
        >
          <Avatar
            shape="square"
            size="large"
            style={{ background: "white" }}
            /* TODO: Заменить реальными данными пользователя */
            src={photoUrl(1)}
          />
          <Typography.Text style={{ color: "white" }}>
            Личный кабинет
          </Typography.Text>
        </Flex>
        <TooltipWrapper wrap={!notifications.length} title="Уведомлений нет">
          <Dropdown menu={{ items: notifications }} placement="bottomRight">
            <Avatar
              style={{ marginLeft: "auto", cursor: "pointer" }}
              icon={<NotificationOutlined color="white" />}
            />
          </Dropdown>
        </TooltipWrapper>
      </Layout.Header>
    );
  });

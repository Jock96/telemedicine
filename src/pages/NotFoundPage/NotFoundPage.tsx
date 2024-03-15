import { Result, Button, Flex } from "antd";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../constants";

export const NotFoundPage: FC = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(Routes.Main);
  };
  return (
    <Flex justify="center" align="center" style={{ height: "100vh" }}>
      <Result
        status="404"
        title="404"
        subTitle="Страница не найдена"
        extra={
          <Button type="primary" onClick={handleClick}>
            На главную
          </Button>
        }
      />
    </Flex>
  );
};

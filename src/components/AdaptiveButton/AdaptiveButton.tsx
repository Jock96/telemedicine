import { FC, ComponentProps } from "react";
import { Button } from "antd";
import { useMediaContext } from "../../contextes";

export const AdaptiveButton: FC<ComponentProps<typeof Button>> = (props) => {
  const { isMobile } = useMediaContext();
  return (
    <Button
      {...props}
      style={
        isMobile
          ? {
              ...props.style,
              height: "100%",
              wordBreak: "break-word",
              whiteSpace: "normal",
              display: "flex",
              alignItems: "baseline",
              textAlign: "start",
            }
          : props.style
      }
    >
      {props.children}
    </Button>
  );
};

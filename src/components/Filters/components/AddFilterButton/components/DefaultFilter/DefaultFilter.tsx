import { FC, useState } from "react";
import { Dropdown, Flex, Button } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useToken } from "antd/es/theme/internal";
import { generateLabel } from "../../helpers";
import { NumericFilterHeader } from "../NumericFilterHeader";
import type { IDefaultFilterProps } from "./types";
import { useMediaContext } from "../../../../../../contextes";

export const DefaultFilter: FC<IDefaultFilterProps> = ({
  filterKey,
  data,
  type,
  children,
  disabled,
  onChangeType,
  onApply,
  onClose,
}) => {
  const { isMobile } = useMediaContext();

  const [, token] = useToken();
  const [open, setOpen] = useState(!data);

  const handleOpenChange = (open: boolean) => {
    if (data && !disabled) {
      setOpen(open);
    }
  };

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const handleApply = () => {
    if (disabled) return;

    setOpen(false);
    onApply();
  };

  return (
    <Dropdown
      trigger={["click"]}
      open={open}
      placement={isMobile ? "bottomCenter" : undefined}
      onOpenChange={handleOpenChange}
      dropdownRender={() => (
        <Flex
          vertical
          gap={8}
          style={{
            backgroundColor: token.colorBgElevated,
            borderRadius: token.borderRadiusLG,
            boxShadow: token.boxShadowSecondary,
            padding: token.padding,
          }}
        >
          <NumericFilterHeader type={type} onChange={onChangeType} />
          {children}
          <Button type="primary" disabled={disabled} onClick={handleApply}>
            Применить
          </Button>
        </Flex>
      )}
    >
      <Button
        type="dashed"
        style={
          isMobile
            ? {
                height: "100%",
                wordBreak: "break-word",
                whiteSpace: "normal",
                display: "flex",
                alignItems: "baseline",
                textAlign: "start",
              }
            : undefined
        }
        icon={<CloseCircleOutlined onClick={handleClose} />}
      >
        {generateLabel({ key: filterKey, data, type })}
      </Button>
    </Dropdown>
  );
};

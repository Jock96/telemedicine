import { FC, useState } from "react";
import { Dropdown, Flex, Button } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useToken } from "antd/es/theme/internal";
import { generateLabel } from "../../helpers";
import { NumericFilterHeader } from "../NumericFilterHeader";
import type { IDefaultFilterProps } from "./types";

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
      <Button type="dashed" icon={<CloseCircleOutlined onClick={handleClose} />}>
        {generateLabel({ key: filterKey, data, type })}
      </Button>
    </Dropdown>
  );
};

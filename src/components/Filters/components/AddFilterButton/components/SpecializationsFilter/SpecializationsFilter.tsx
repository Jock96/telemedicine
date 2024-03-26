import { FC, useState } from "react";
import type { ISpecificFilter } from "../FilterSwitch";
import { Select, Flex, Typography } from "antd";
import { DefaultOptionType } from "antd/lib/select";
import { SPECIALIZATIONS } from "../../../../../../mocks";
import type { ISpecialization } from "../../../../../../entities";
import { CloseCircleOutlined } from "@ant-design/icons";
import { generateSpecializationsLabel } from "../../helpers";
import "./SpecializationsFilter.css";
import { TooltipWrapper } from "../../../../../TooltipWrapper";
import { LABEL_OFFSET } from "./constants";
import { AdaptiveButton } from "../../../../../AdaptiveButton";

export const SpecializationsFilter: FC<ISpecificFilter<"specializations">> = ({
  data,
  onChange,
}) => {
  // TODO: !data ? true : !prevData решает проблему первого открытия, но если есть данные - меню всегда открыто
  const [open, setOpen] = useState(!data);

  const handleOpenChange = (open: boolean) => {
    if (data) {
      setOpen(open);
    }
  };

  const toggleView = () => setOpen((prev) => !prev);

  // TODO: получать с сервера
  const options: DefaultOptionType[] = SPECIALIZATIONS.map(
    (specialization) => ({ label: specialization, value: specialization })
  );

  const handleChange = (value: string[]) => {
    onChange(value.length ? { value: value as ISpecialization[] } : undefined);
  };

  const handleClose = () => {
    onChange(undefined);
  };

  const { label, rest } = generateSpecializationsLabel(data);

  return open ? (
    <Select
      open={open}
      onDropdownVisibleChange={handleOpenChange}
      mode="multiple"
      allowClear
      className="specializationsSelect"
      placeholder="Поиск"
      value={data?.value}
      onChange={handleChange}
      options={options}
      style={{
        width:
          150 +
          ((data?.value.length ?? 0) > 5 ? 5 : data?.value.length ?? 0) *
            LABEL_OFFSET,
      }}
    />
  ) : (
    <TooltipWrapper
      wrap={!!rest.length}
      trigger={["hover"]}
      title={
        <Flex gap={4}>
          {
            <Typography.Text style={{ color: "white" }}>
              {rest.join(", ")}
            </Typography.Text>
          }
        </Flex>
      }
    >
      <AdaptiveButton
        type="dashed"
        icon={<CloseCircleOutlined onClick={handleClose} />}
        onClick={toggleView}
      >
        {label}
      </AdaptiveButton>
    </TooltipWrapper>
  );
};

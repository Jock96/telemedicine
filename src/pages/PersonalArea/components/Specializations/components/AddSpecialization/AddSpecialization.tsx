import { FC, useState } from "react";
import type { IAddSpecializationProps } from "./types";
import { Button, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { ISpecialization } from "../../../../../../entities";

export const AddSpecialization: FC<IAddSpecializationProps> = ({
  specializations,
  onAdd,
}) => {
  const [isPrepareToAdd, setIsPreapreToAdd] = useState(false);

  const handlePreapareToAdd = () => {
    setIsPreapreToAdd(true);
  };

  const onClose = () => {
    setIsPreapreToAdd(false);
  };

  const handleSelect = (value: ISpecialization) => {
    onAdd(value);
    onClose();
  };

  return isPrepareToAdd ? (
    <Select
      open
      options={specializations.map((specialization) => ({
        label: specialization,
        value: specialization,
      }))}
      onSelect={handleSelect}
      onDropdownVisibleChange={onClose}
      size="small"
      placeholder="Поиск"
      style={{ minWidth: 150 }}
      showSearch
    />
  ) : (
    <Button
      size="small"
      type="dashed"
      icon={<PlusOutlined />}
      onClick={handlePreapareToAdd}
    >
      Добавить специализацию
    </Button>
  );
};

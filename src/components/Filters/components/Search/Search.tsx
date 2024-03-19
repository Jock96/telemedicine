import { ChangeEventHandler, FC } from "react";
import { Input } from "antd";
import type { ISearchProps } from "./types";

export const Search: FC<ISearchProps> = ({ value, onChange }) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) =>
    onChange(target.value);
  return <Input.Search value={value} onChange={handleChange} allowClear placeholder="Введите ФИО" />;
};

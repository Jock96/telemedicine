import type { IFilter } from "../../../../entities";

export type IAddFilterButton = Omit<IFilter, "search">;

export interface IFilterChanger {
  onChange: (
    key: keyof IAddFilterButton,
    data: IAddFilterButton[keyof IAddFilterButton]
  ) => void;
}

export interface IAddFilterButtonProps extends IAddFilterButton, IFilterChanger {}

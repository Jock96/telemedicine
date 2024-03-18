import type { IAddFilterButton, IFilterChanger } from "../../types";

export interface IFilterSwitch extends IFilterChanger {
  type: keyof IAddFilterButton;
  value?: IAddFilterButton[keyof IAddFilterButton];
}

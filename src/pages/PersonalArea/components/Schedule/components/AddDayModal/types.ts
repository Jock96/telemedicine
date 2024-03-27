import type { IDayRange } from "../../../../../../entities";
import { AddingDayType } from "../../constants";

export interface IAddDayModalProps {
  type?: AddingDayType;
  onCancel(): void;
  onAddOneDay(value: IDayRange): void;
  existingDays: IDayRange[];
}

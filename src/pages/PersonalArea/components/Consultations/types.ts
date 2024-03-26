import type { IUser } from "../../../../entities";

export interface IColumnGenerator {
  onDeleteConsultation(id: IUser["id"]): void;
  onChangeConsultationDate(id: IUser["id"]): void;
}

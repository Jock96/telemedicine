import type { IUser } from "../../../../entities";

export interface IColumnGenerator {
  specialist?: boolean;
  onDeleteConsultation(id: IUser["id"]): void;
  onChangeConsultationDate(id: IUser["id"]): void;
}

import type { IUser } from "../../../../entities/user";

export interface IColumnGenerator {
  specialist?: boolean;
  onDeleteConsultation(id: IUser["id"]): void;
  onChangeConsultationDate(id: IUser["id"]): void;
}

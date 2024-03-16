import type { Id } from "./id";
import type { ISpecialist } from "./specialist";
import type { ISpecialization } from "./specialization";

export interface IConsultation
  extends Pick<ISpecialist, "firstName" | "lastName" | "patronymic" | "photoUrl">, Id {
  specialization: ISpecialization;
  time: string; // TODO iso
}

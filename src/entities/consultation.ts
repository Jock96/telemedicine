import type { Id } from "./id";
import type { ISpecialist } from './specialist';
import { ISpecialization } from "./specialization";
import type { IUser } from "./user";

export interface IConsultation extends Id {
  specialist?: ISpecialist;
  specialization: ISpecialization;
  user?: IUser;
  time: string; // iso
}

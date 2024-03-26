import type { Id } from "./id";

export interface IUser extends Id {
  firstName: string;
  lastName: string;
  patronymic?: string;
  photoUrl?: string;
  // единый формат + код страны
  phone?: string;
  email?: string;
  isSpecialist?: boolean;
  // мультиаккаунт? (специалист/юзер)
  multi?: boolean;
}

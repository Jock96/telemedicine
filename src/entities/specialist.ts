import type { IComment } from "./comment";
import type { IUser } from "./user";
import type { IPrice } from "./price";
import type { ISpecialization } from "./specialization";
import type { ISlot } from "./slot";
import type { IYearsOfWorkExpirience } from "./yearsOfWorkExpirience";
import type { IWorkDuration } from "./workDuration";
import type { IWorkTime } from "./workTime";

export interface ISpecialist extends IUser {
    yearsOfWorkExpirience: IYearsOfWorkExpirience  // стаж работы - [количество лет, количество месяцев] [0 | 50, 0 | 11]
    workDuration: IWorkDuration[]; // длительность консультации - iso
    comments: IComment[]; // комменты
    specializations: ISpecialization[]; // специализации
    workTime: IWorkTime// гибкая настройка по дням
    pricing: IPrice // цена за прием - надо сделать зависимость от специализации
    nearestWorkTime: string; // ближайшее время записи - iso
    slots: ISlot[]; // свободные слоты
    visiteDates: string[]; // даты посещений (прошедшие и предстоящие)
}

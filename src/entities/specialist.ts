import type { IComment } from "./comment";
import type { IUser } from "./user";
import type { IPrice } from "./price";
import type { ISpecialization } from "./specialization";

export interface ISpecialist extends IUser {
    yearsOfWorkExpirience: number // стаж работы
    workDuration: string; // длительность консультации - iso
    comments: IComment[]; // комменты
    specializations: ISpecialization[]; // специализации
    workTime: {
        // TODO: гибкая настройка по дням (референс - гугл календарь)
    };
    pricing: IPrice // цена за прием - надо сделать зависимость от специализации
    nearestWorkTime: string; // ближайшее время записи - iso
    slots: Date[][]; // свободные слоты - нужно ли?
    // TODO: (nice to have) больницы в которых работает и часы работы в ней - для докторов
}

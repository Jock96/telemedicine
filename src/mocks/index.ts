import type { ISpecialist, ISpecialization } from "../entities";
import type { IComment } from "../entities/comment";
import { IConsultation } from "../entities/consultation";
import type { ICurrency } from "../entities/currency";
import dayjs from "dayjs";

export const photoUrl = (id: number) =>
  `https://api.dicebear.com/7.x/miniavs/svg?seed=${id}`;

const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const SPECIALISTS_LIST: ISpecialist[] = Array<ISpecialist>(20)
  .fill({} as ISpecialist)
  .map((_, idx) => ({
    id: idx.toString(),
    firstName: "firstName",
    lastName: "lastName",
    patronymic: "patronymic",
    yearsOfWorkExpirience: getRandomInt(0, 20),
    workDuration: "2024", // string iso ?
    comments: Array(getRandomInt(0, 20))
      .fill({} as IComment)
      .map(() => ({
        id: idx.toString(),
        fromWho: "fromWho",
        rating: getRandomInt(0, getRandomInt(1, 5)),
        value: "comment",
        photoUrl: photoUrl(idx + 1),
      })),
    specializations: Array.from(
      new Set(
        Array(getRandomInt(1, 240))
          .fill("")
          .map(() => getRandomInt(1, 20).toString())
      )
    ) as ISpecialization[],
    pricing: {
      value: "1000",
      currency: "RUB" as ICurrency,
    },
    phone: "+7 777 777 77 77",
    email: "test@test.com",
    photoUrl: photoUrl(idx),
    workTime: {},
    nearestWorkTime: "2024", // string iso ?
    slots: [
      [new Date(getRandomInt(0, 2024)), new Date(getRandomInt(0, 2024) + 1)],
    ],
  }));

export const CONSULTATIONS: IConsultation[] = Array<IConsultation>(20)
  .fill({} as IConsultation)
  .map((_, idx) => ({
    id: idx.toString(),
    specialist: SPECIALISTS_LIST[idx],
    specialization: SPECIALISTS_LIST[idx].specializations[0],
    time: dayjs()
      .add(getRandomInt(0, 7), "day")
      .add(getRandomInt(0, 24), "hour")
      .toString(), // TODO iso
  }));

export const VISITED_SPECIALISTS = (() => {
  const rndIndexes = Array.from(
    new Set(
      Array<number>(getRandomInt(0, SPECIALISTS_LIST.length - 1))
        .fill(0)
        .map(() => getRandomInt(0, SPECIALISTS_LIST.length - 1))
    )
  );
  return SPECIALISTS_LIST.filter((_, index) => rndIndexes.includes(index));
})();

import { createBrowserRouter } from "react-router-dom";
import { IWorkDuration } from "./entities";
import {
  SpecialistListPage,
  SpecialistPage,
  NotFoundPage,
  PersonalArea,
} from "./pages";

export enum Routes {
  Main = "/",
  Specialist = "/specialist",
  PersonalArea = "/personalArea",
}

export const DATE_FORMAT = "DD.MM.YYYY";
export const TIME_FORMAT = "HH:mm";
export const DATE_AND_TIME_FORMAT = "DD.MM.YYYY HH:mm";
export const HOURS = Array(24)
  .fill(0)
  .map((_, index) => index);
export const MINUTES = Array(60)
  .fill(0)
  .map((_, index) => index);

export enum TIME_SELECT_TYPE {
  RECOMEND = "RECOMEND",
  SELF = "SELF",
}

export const RECOMEND_MINUTES_TIME_DURATION = [15, 30, 45];
export const RECOMEND_HOURS_TIME_DURATION = [0, 1, 2];
export const RECOMEND_TIME_DURATION: Required<IWorkDuration["value"]>[] =
  RECOMEND_HOURS_TIME_DURATION.map((hours) =>
    [...(hours > 0 ? [0] : []), ...RECOMEND_MINUTES_TIME_DURATION].map(
      (minutes) => ({ hours, minutes } as Required<IWorkDuration["value"]>)
    )
  ).flat();

export const WEEK_DAYS = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"]
export const WEEK_SHORT_DAYS = ["Пн.", "Вт.", "Ср.", "Чт.", "Пт.", "Сб.", "Вс."]

export const generateRoutes = (specialist?: boolean) =>
  createBrowserRouter(
    specialist
      ? [
          {
            path: "*",
            element: <NotFoundPage />,
          },
          {
            path: Routes.Main,
            element: <PersonalArea />,
          },
        ]
      : [
          {
            path: "*",
            element: <NotFoundPage />,
          },
          {
            path: Routes.Main,
            element: <SpecialistListPage />,
          },
          {
            path: `${Routes.Specialist}/:id`,
            element: <SpecialistPage />,
          },
          {
            path: Routes.PersonalArea,
            element: <PersonalArea />,
          },
        ]
  );

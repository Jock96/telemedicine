import { createBrowserRouter } from "react-router-dom";
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

export const generateRoutes = (specialist?: boolean) =>
  createBrowserRouter(
    specialist
      ? []
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

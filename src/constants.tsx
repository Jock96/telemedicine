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

export const generateRoutes = (medic?: boolean) =>
  createBrowserRouter(
    medic
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

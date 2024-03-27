import { App as AntApp, ConfigProvider } from "antd";
import { RouterProvider } from "react-router-dom";
import { generateRoutes } from "./constants";
import locale from "antd/locale/ru_RU";
import { MediaContextProvider, UserContextProvider } from "./contextes";
import { USER } from "./mocks";

// TODO: АДАПТИВ! на 320
// TODO: Оптимизация! Memo, вынос компонентов в отдельные со своим стейтом и пр
// TODO: Доработать работу со временем везде и добавить смещение времени сервера

function App() {
  // TODO: каждой специализации свой цвет
  const user = USER; // TODO: после авторизации проверять кто
  return (
    <UserContextProvider value={{ user }}>
      <MediaContextProvider>
        <ConfigProvider locale={locale}>
          <AntApp>
            <RouterProvider router={generateRoutes(user.isSpecialist)} />
          </AntApp>
        </ConfigProvider>
      </MediaContextProvider>
    </UserContextProvider>
  );
}

export default App;

import { App as AntApp, ConfigProvider } from "antd";
import { RouterProvider } from "react-router-dom";
import { generateRoutes } from "./constants";
import locale from 'antd/locale/ru_RU';

// Пациент

// CORE
// Страница списка медицинских работников с фильтрами
// Страница медицинского работника с подробной записью
// Личный кабинет с календарём записи
// Видеоконференция с чатом

// Nice to have:
// Карта больниц и аптек (информация по времени работы + запись на прием)
// Интеграция со сторонними сервисами (ЕАПТЕКА)

// Работник

// CORE
// Личный кабинет (информация, часы приёма, входящие запросы на лечение)
// Видеоконференция с чатом

//

function App() {
  // TODO: каждой специализации свой цвет
  const specialist = false; // TODO: после авторизации проверять кто
  return (
    <ConfigProvider locale={locale}>
      <AntApp>
        <RouterProvider router={generateRoutes(specialist)} />
      </AntApp>
    </ConfigProvider>
  );
}

export default App;

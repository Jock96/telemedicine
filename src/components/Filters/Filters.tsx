import { FC } from "react";
import { Card, Typography, Collapse, Flex } from "antd";
import { AddFilterButton, Search, IFilterChanger } from "./components";
import { useUrlStatePrams } from "../../hooks";
import { IFilter } from "../../entities";
import { FILTERS_KEY } from "./constants";

export const Filters: FC = () => {
  const [state, setState] = useUrlStatePrams<IFilter>({
    paramsName: FILTERS_KEY,
    initialState: {},
  });

  const handleSearchChange = (search: string) => {
    setState({ ...state, search });
  };

  const handleFilterChange: IFilterChanger["onChange"] = (key, data) => {
    setState({ ...state, [key]: data });
  };

  return (
    <Card style={{ width: "100%" }}>
      <Collapse
        ghost
        items={[
          {
            key: "1",
            label: <Typography.Text strong>Фильтры</Typography.Text>,
            children: (
              <Flex vertical gap={8}>
                <Search value={state?.search} onChange={handleSearchChange} />
                <AddFilterButton {...state} onChange={handleFilterChange} />
              </Flex>
            ),
          },
        ]}
      />
    </Card>
  );
};

import { FC } from "react";
import {
  Typography,
  Collapse,
  Flex,
  Divider,
  Button,
  Tooltip,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { AddFilterButton, Search, Sort } from "./components";
import { FILTERS_KEY, INITAL_FILTER_STATE, useFilters } from "./hooks";
import { IFiltersProps } from "./types";
import { useMediaContext } from "../../contextes";
import "./Filters.css";
import { CardWrapper } from "../CardWrapper";

export const Filters: FC<IFiltersProps> = ({
  forbiddenFilters,
  forbiddenSortBy,
  hideSearch,
  hideFilters,
  hideSort,
  filterKey,
  wrapInCard = true,
}) => {
  const {
    search,
    filters,
    sort,
    hasFilters,
    onSearchChange,
    onFiltersChange,
    onSortChange,
    onDropFilters,
  } = useFilters(filterKey);

  const { isMobile } = useMediaContext();

  if (hideSort && hideSearch && hideFilters) return null;

  return (
    <CardWrapper wrap={wrapInCard} style={{ width: "100%" }}>
      <Collapse
        ghost
        className={isMobile ? "filtersMobileContainer" : undefined}
        activeKey={
          JSON.stringify({ search, ...filters }) ===
          JSON.stringify(INITAL_FILTER_STATE)
            ? undefined
            : FILTERS_KEY
        }
        items={[
          {
            key: FILTERS_KEY,
            label: <Typography.Text strong>Фильтры</Typography.Text>,
            extra: hasFilters && (
              <Tooltip title="Сбросить">
                <Button
                  danger
                  type="text"
                  icon={<DeleteOutlined />}
                  onClick={onDropFilters}
                />
              </Tooltip>
            ),
            children: (
              <Flex vertical gap={8}>
                {!hideSearch && (
                  <Search value={search} onChange={onSearchChange} />
                )}
                {!hideFilters && (
                  <AddFilterButton
                    {...filters}
                    forbiddenFilters={forbiddenFilters}
                    onChange={onFiltersChange}
                  />
                )}
                {!hideFilters && !hideSort && (
                  <Divider style={{ margin: "4px 0" }} dashed />
                )}
                {!hideSort && (
                  <Sort
                    value={sort}
                    forbiddenSortBy={forbiddenSortBy}
                    onChange={onSortChange}
                  />
                )}
              </Flex>
            ),
          },
        ]}
      />
    </CardWrapper>
  );
};

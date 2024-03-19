import { FC, useState } from "react";
import type { ISortProps } from "./types";
import { Button, Flex, Dropdown, Typography } from "antd";
import {
  PlusOutlined,
  CloseCircleOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";
import { SortDirectionToLabelMap, SortKeyToLabelMap } from "./constants";
import { ISortBy, ISortDirection, ISorter } from "../../../../entities";

export const Sort: FC<ISortProps> = ({
  value,
  forbiddenSortBy: forbiddenSortByProp,
  onChange,
}) => {
  const forbiddenSortBy = forbiddenSortByProp
    ? Array.from(new Set(forbiddenSortByProp))
    : undefined;
  const [preparingSortBy, setPreparingSortBy] = useState<ISortBy>();

  const allowedSort: ISorter[] =
    (forbiddenSortBy
      ? value?.filter(({ sortBy }) => !forbiddenSortBy.includes(sortBy))
      : value) ?? [];

  const canShowAddSortButton = value
    ? value.length < Object.keys(SortKeyToLabelMap).length &&
      forbiddenSortBy?.length !== Object.entries(SortKeyToLabelMap).length
    : forbiddenSortBy?.length !== Object.entries(SortKeyToLabelMap).length;

  const [openSortBy, setOpenSortBy] = useState<ISortBy[]>([]);

  const prepareSort = (sortBy: ISortBy) => {
    setPreparingSortBy(sortBy);
  };

  const onRemovePreparing = () => {
    setPreparingSortBy(undefined);
  };

  const onRemoveSort = (sortBy: ISortBy) => {
    setOpenSortBy((prevOpenSortBy) =>
      prevOpenSortBy.filter((prevSortBy) => prevSortBy !== sortBy)
    );
    onChange(
      allowedSort.filter((currentSort) => currentSort.sortBy !== sortBy)
    );
  };

  const onSort = (sort: ISorter) => {
    if (preparingSortBy === sort.sortBy) {
      onRemovePreparing();
    } else {
      setOpenSortBy((prevOpenSortBy) =>
        prevOpenSortBy.filter((sortBy) => sortBy === sort.sortBy)
      );
    }
    onChange(
      allowedSort.find(({ sortBy }) => sort.sortBy === sortBy)
        ? allowedSort.map((currentSort) =>
            currentSort.sortBy === sort.sortBy ? sort : currentSort
          )
        : [...allowedSort, sort]
    );
  };

  const handleOpenChange = (sortBy: ISortBy) => {
    setOpenSortBy((prevOpenSortBy) =>
      prevOpenSortBy.includes(sortBy)
        ? prevOpenSortBy.filter((prevSortBy) => prevSortBy !== sortBy)
        : [...prevOpenSortBy, sortBy]
    );
  };

  return (
    <Flex gap={4} wrap="wrap">
      {allowedSort.map(({ sortBy, direction }) => (
        <Dropdown
          open={openSortBy.includes(sortBy)}
          onOpenChange={() => handleOpenChange(sortBy)}
          trigger={["click"]}
          menu={{
            items: [
              {
                key: ISortDirection.ASC,
                label: (
                  <Flex align="center" gap={4}>
                    <SortAscendingOutlined />
                    <Typography.Text>
                      {SortDirectionToLabelMap[ISortDirection.ASC]}
                    </Typography.Text>
                  </Flex>
                ),
                onClick: () =>
                  onSort({
                    direction: ISortDirection.ASC,
                    sortBy: sortBy,
                  }),
              },
              {
                key: ISortDirection.DESC,
                label: (
                  <Flex align="center" gap={4}>
                    <SortDescendingOutlined />
                    <Typography.Text>
                      {SortDirectionToLabelMap[ISortDirection.DESC]}
                    </Typography.Text>
                  </Flex>
                ),
                onClick: () =>
                  onSort({
                    direction: ISortDirection.DESC,
                    sortBy: sortBy,
                  }),
              },
            ],
          }}
        >
          <Button
            type="dashed"
            icon={<CloseCircleOutlined onClick={() => onRemoveSort(sortBy)} />}
          >
            {`${SortKeyToLabelMap[sortBy]}: ${SortDirectionToLabelMap[direction]}`}
          </Button>
        </Dropdown>
      ))}
      {preparingSortBy && (
        <Dropdown
          open
          trigger={["click"]}
          menu={{
            items: [
              {
                key: ISortDirection.ASC,
                label: (
                  <Flex align="center" gap={4}>
                    <SortAscendingOutlined />
                    <Typography.Text>
                      {SortDirectionToLabelMap[ISortDirection.ASC]}
                    </Typography.Text>
                  </Flex>
                ),
                onClick: () =>
                  onSort({
                    direction: ISortDirection.ASC,
                    sortBy: preparingSortBy,
                  }),
              },
              {
                key: ISortDirection.DESC,
                label: (
                  <Flex align="center" gap={4}>
                    <SortDescendingOutlined />
                    <Typography.Text>
                      {SortDirectionToLabelMap[ISortDirection.DESC]}
                    </Typography.Text>
                  </Flex>
                ),
                onClick: () =>
                  onSort({
                    direction: ISortDirection.DESC,
                    sortBy: preparingSortBy,
                  }),
              },
            ],
          }}
        >
          <Button
            type="dashed"
            icon={<CloseCircleOutlined onClick={onRemovePreparing} />}
          >
            {SortKeyToLabelMap[preparingSortBy]}
          </Button>
        </Dropdown>
      )}
      {canShowAddSortButton && !preparingSortBy && (
        <Dropdown
          menu={{
            items: Object.entries(SortKeyToLabelMap)
              .filter(([key]) =>
                forbiddenSortBy
                  ? !forbiddenSortBy.includes(key as ISortBy)
                  : true
              )
              .filter(
                ([key]) =>
                  allowedSort.find(({ sortBy }) => key === sortBy) === undefined
              )
              .map(([key, label]) => ({
                key,
                label,
                onClick: () => prepareSort(key as ISortBy),
              })),
          }}
        >
          <Button type="text" icon={<PlusOutlined />}>
            Добавить сортировку
          </Button>
        </Dropdown>
      )}
    </Flex>
  );
};

import type { IDayRange } from "../../../../../entities";
import dayjs from "dayjs";
import { DATE_FORMAT, TIME_FORMAT } from "../../../../../constants";

export const generateDayRangeLabel = ({ from, to, allDay }: IDayRange) =>
  allDay
    ? dayjs(from).format(DATE_FORMAT).toString()
    : `${dayjs(from).format(DATE_FORMAT)} с ${dayjs(from).format(
        TIME_FORMAT
      )} по ${dayjs(to).format(TIME_FORMAT)}`;

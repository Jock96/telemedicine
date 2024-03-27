import type { IRangeOfDays } from "../../../../../entities";
import dayjs from "dayjs";
import { DATE_AND_TIME_FORMAT, DATE_FORMAT } from "../../../../../constants";

export const generateRangeOfDaysLabel = ({ from, to }: IRangeOfDays) =>
  `С ${dayjs(from.value).format(
    from.allDay ? DATE_FORMAT : DATE_AND_TIME_FORMAT
  )} по ${dayjs(to.value).format(
    to.allDay ? DATE_FORMAT : DATE_AND_TIME_FORMAT
  )}`;

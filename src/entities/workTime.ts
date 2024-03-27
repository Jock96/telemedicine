import type { IntRange } from "./common";

export interface IDayRange {
  from: string; // ISO
  to: string; // ISO
  allDay?: boolean;
}

export interface IRangeOfDays {
  from: {
    value: string; // ISO
    allDay?: boolean;
  };
  to: {
    value: string; // ISO
    allDay?: boolean;
  };
}

interface IDayInfo {
  regularWeekDays: IntRange<0, 7>[]; // 0 - 6 (пн - вс)
  extraDays: IDayRange[];
  extraDayRanges: IRangeOfDays[];
}

export interface IWorkTime {
  workingDayInfo: IDayInfo;
  dayOffInfo: IDayInfo;
}

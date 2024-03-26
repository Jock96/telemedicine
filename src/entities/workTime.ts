import type { IntRange } from "./common";

interface DayRange {
    from: string; // ISO
    to: string; // ISO
}

interface IDayInfo {
  regularWeekDays: IntRange<0, 7>[]; // 0 - 6 (пн - вс)
  extraDays: string[]; // ISO
  extraDayRanges: DayRange[]; // ISO from to
}

export interface IWorkTime {
  workingDayInfo: IDayInfo;
  dayOfInfo: IDayInfo;
}

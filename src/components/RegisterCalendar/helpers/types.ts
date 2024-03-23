import dayjs from "dayjs";

export interface IGeneratetSegment {
  start: dayjs.Dayjs;
  end: dayjs.Dayjs;
}

export interface ISegmentsGenerator {
  selectedDateSlots: {
    from: dayjs.Dayjs;
    to: dayjs.Dayjs;
  }[];
  durationHours: number;
  durationMinutes: number;
}

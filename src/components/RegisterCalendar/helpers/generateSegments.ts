import type { IGeneratetSegment, ISegmentsGenerator } from "./types";

export const generateSegments = ({
  selectedDateSlots,
  durationHours,
  durationMinutes,
}: ISegmentsGenerator) => {
  const segments: IGeneratetSegment[] = [];

  if (
    selectedDateSlots.length &&
    (durationHours !== 0 || durationMinutes !== 0)
  ) {
    selectedDateSlots.forEach(({ from, to }) => {
      let startCursor = from.clone();
      let endCursor = from
        .clone()
        .add(durationHours, "hours")
        .add(durationMinutes, "minutes");
      const end = to.unix();

      while (endCursor.unix() <= end) {
        segments.push({ start: startCursor, end: endCursor });

        startCursor = endCursor.clone();
        endCursor = endCursor
          .clone()
          .add(durationHours, "hours")
          .add(durationMinutes, "minutes");
      }
    });
  }

  return segments
};

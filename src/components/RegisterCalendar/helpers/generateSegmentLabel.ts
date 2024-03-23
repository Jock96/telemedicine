import type { IGeneratetSegment } from "./types";
import { TIME_FORMAT } from "../../../constants";

export const generateSegmentLabel = ({ start, end }: IGeneratetSegment) =>
  `С ${start.format(TIME_FORMAT)} по ${end.format(TIME_FORMAT)}`;

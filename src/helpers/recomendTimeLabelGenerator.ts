import { IWorkDuration } from "../entities";

// TODO: plural
export const recomendTimeLabelGenerator = ({
  hours,
  minutes,
}: Required<IWorkDuration["value"]>) =>
  `${hours ? hours + " час " : ""}${minutes ? minutes + " минут" : ""}`;

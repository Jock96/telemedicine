import type { ISpecialization } from "../../../../../../entities";

export interface IAddSpecializationProps {
    specializations: ISpecialization[];
    onAdd(specialization: ISpecialization): void;
}

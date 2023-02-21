import { ClassInterface } from "services/classes/interfaces";

export interface EmotionalThermometerProps {
  classDetails: ClassInterface;
}

export interface FormInitialValue {
  id?: number | string;
  score: number;

  challenge: string;

  most_remarkable: string;
}

export interface EmotionalThermometerType extends FormInitialValue {
  id_class: number | string;
}

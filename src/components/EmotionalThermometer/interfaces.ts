import { ClassInterface } from "services/classes/interfaces";

export interface EmotionalThermometerProps {
  classDetails: ClassInterface;
}

export interface FormInitialValue {
  id?: number | string;
  score: number | string;

  challenge: string;

  achievement: string;
}

export interface EmotionalThermometerType extends FormInitialValue {
  id_class: number | string;

  date: Date;
}

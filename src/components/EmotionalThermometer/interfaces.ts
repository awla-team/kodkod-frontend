import { type Moment } from 'moment';
import { type Dispatch, type SetStateAction } from 'react';
import type React from 'react';
import { type IClass } from 'global/interfaces';

export interface EmotionalThermometerProps {
  classDetails: IClass;
}

export interface FormInitialValue {
  id?: number | string;
  score: number;

  challenge: string;

  most_remarkable: string;
}

export interface EmotionalThermometerType extends FormInitialValue {
  id_class: number | string;

  date: Date;
}

export interface EmotionalThermometerFormProps {
  editable: boolean;
  setEditable: (editable: boolean) => void;
}

export interface IScoreOption {
  text: string;
  value: number;
  icon: React.ReactNode;
  selectedIcon: React.ReactNode;
}

export interface ClassClimateMeterProps {
  editable: boolean;
}

export interface TodayReviewsProps {
  editable: boolean;

  setEditable: Dispatch<SetStateAction<boolean>>;
}

export interface ThermometerCalendarProps {
  date: Moment;
  handleDateChange: (date: Moment) => void;
  classId: number | string;
}

export interface EmotionalTermometer extends FormInitialValue {
  date: string;
}

export interface TermometerChartData {
  date: number;
  category: string;
}

export interface TermometerChartProps {
  data: TermometerChartData[];
}

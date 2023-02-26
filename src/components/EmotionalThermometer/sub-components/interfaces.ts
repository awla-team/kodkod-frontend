import { Dispatch, SetStateAction } from "react";
import type { Moment } from "moment";

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

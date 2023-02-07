import { Dispatch, SetStateAction } from "react";

export interface ClassClimateMeterProps {
  editable: boolean;
}

export interface TodayReviewsProps {
  editable: boolean;

  setEditable: Dispatch<SetStateAction<boolean>>;
}

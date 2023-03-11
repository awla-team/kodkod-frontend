import { IMission } from "global/interfaces";
import { StudentsDetailsType } from "../../Drawers/MissionAccomplished/interfaces";

export interface StudentsSelectableListProps {
  mission: IMission;

  studentsDetails: StudentsDetailsType[];
}

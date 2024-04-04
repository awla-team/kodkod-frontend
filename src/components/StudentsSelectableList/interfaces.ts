import { type IMission, type IStage } from 'global/interfaces';
import { StudentsDetailsType } from '../Modals/MissionAccomplished/interfaces';

export interface StudentsSelectableListProps {
  mission?: IMission;
  handleClose: () => void;
  stage: IStage;
  onSave: (stageId: number | string) => void;
}

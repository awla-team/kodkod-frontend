import type IActivity from 'types/models/Activity';
import { type IActivitySaved } from 'types/models/Activity';

export interface ViewDeleteActivityDialogProps {
  open: boolean;
  handleClose: () => void;
  activityDeleteListAdd?: () => void;
  newActivity?: IActivitySaved;
  editedActivity?: IActivity;
  index: number;
}

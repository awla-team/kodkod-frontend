export interface IUnit {
  id: number;
  subject_id: number;
  title: string;
  learning_goals: LearningGoal[];
}

interface LearningGoal {
  id: number;
  unit_id: number;
  description: string;
}

export interface ViewLearningGoalsDialogProps {
  open: boolean;
  currentUnit?: IUnit;
  handleClose: () => void;
}

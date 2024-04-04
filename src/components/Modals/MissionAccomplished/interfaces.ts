import type React from 'react';
import { type IMission, type IStage } from '../../../global/interfaces';

export interface MissionAccomplishedProps {
  open: boolean;
  anchor: 'left' | 'right' | 'top' | 'bottom';
  onSave: (stageId: number | string) => void;
  onClose: () => void;
  stage: IStage;
  mission?: IMission | null;
}

export interface StudentsDetailsType {
  id_user: number;
  id_stage: number;
  id_mission: number;
  prev_points: number;
  credit_points: number;
  new_points: number;
  created_at: string;
}

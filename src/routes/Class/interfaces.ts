import { type IClass , type IStage } from 'global/interfaces';
import { type StudentType } from 'components/StudentsList/interfaces';
import { type Levels } from 'components/Modals/CreateClassModal/interfaces';
import type React from 'react';
import { type FetchStatus } from 'global/enums';

export type TabPaths = Record<number, string>;

export interface ClassContextType {
  getClassById: (id: number | string) => void;
  classDetails: IClass | undefined;
  students: StudentType[];
  loadingClass: FetchStatus;
  getStudentsByClass: (id: number | string) => void;
  updateStageData: (stage: IStage) => void;
  updateStudentsData: (
    actionType: 'delete' | 'update',
    data?: StudentType | StudentType[]
  ) => void;
  levels: Levels[];
  setClassDetails: React.Dispatch<React.SetStateAction<IClass | undefined>>;
}

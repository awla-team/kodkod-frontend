import { ClassInterface } from 'services/classes/interfaces';
import { StudentType } from 'components/StudentsList/interfaces';
import { Levels } from 'components/Modals/CreateClassModal/interfaces';
import React from 'react';
import { FetchStatus } from 'global/enums';
import { IStage } from 'global/interfaces';

export interface TabPaths {
  [index: number]: string;
}

export interface ClassContextType {
  getClassById: (id: number | string) => void;
  classDetails: ClassInterface | undefined;
  students: StudentType[];
  loadingClass: FetchStatus;
  getStudentsByClass: (id: number | string) => void;
  updateStageData: (stage: IStage) => void;
  updateStudentsData: (actionType: 'delete' | 'update', data?: StudentType | StudentType[]) => void;
  levels: Levels[];
  setClassDetails: React.Dispatch<React.SetStateAction<ClassInterface | undefined>>;
}

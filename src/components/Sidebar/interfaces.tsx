import { type ITeacherSubjectClassroom } from 'global/interfaces';

export interface Route {
  title: string;
  img: string;
  path: string;
}

export interface SidebarProps {
  classrooms?: ITeacherSubjectClassroom[];
  // handleOpenModal: () => void;
}

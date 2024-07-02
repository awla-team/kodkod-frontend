import { type ITeacherSubjectClassroom } from 'global/interfaces';
import { type To } from 'react-router-dom';

export interface SidebarLinkProps {
  linkId: string | number;
  linkTitle: string;
  linkRoute: typeof To;
  classroom: ITeacherSubjectClassroom;
}

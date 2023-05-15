import { IUser } from 'global/interfaces';

interface TeacherType extends IUser {
  role: 'teacher';
}

export interface AuthContextType {
  user: TeacherType | null;
  logout: () => void;
  checkUserSubscription: (reason: string, callback: () => void) => void;
}

import type IClassroom from 'types/models/Classroom';
import { create } from 'zustand';

interface Store {
  classroom: IClassroom | null;
}

interface Action {
  setClassroom: (classroom: IClassroom) => void;
}

const ClassroomStore = create<Store & Action>((set) => ({
  classroom: null,
  setClassroom: (classroom) => set({ classroom }),
}));

export const useClassroomStore = ClassroomStore;

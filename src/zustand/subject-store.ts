import { getSubjectById } from 'services/subject';
import { getTeacherSubjectClassroomById } from 'services/teacher_subject_classroom';
import type Subject from 'types/models/Subject';
import { create } from 'zustand';

interface Store {
  subject: Subject | null;
  isLoading: boolean;
  classroomId: number;
}

interface Action {
  setSubject: (subject: Subject) => void;
  fetchSubject: (subjectId: string) => void;
  setClassroomId: (id: number) => void;
}

const subjectStore = create<Store & Action>((set) => ({
  isLoading: false,
  subject: null,
  classroomId: 0,
  setSubject: (subject) => set({ subject }),
  setClassroomId: (id) => set({ classroomId: id }),
  fetchSubject: async (id) => {
    try {
      set({ isLoading: true });
      // Fetch subject data from API
      const { status, data } = await getTeacherSubjectClassroomById(id);
      set({ classroomId: data.classroom_id });
      if (status === 200) {
        const { data: subject } = await getSubjectById(data.subject_id);
        set({ subject });
      }
    } catch (e) {
      set({ subject: null });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export const useSubjectStore = subjectStore;

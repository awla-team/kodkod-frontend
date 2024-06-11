import type Subject from 'types/models/Subject';
import { create } from 'zustand';

interface Store {
  subject: Subject | null;
}

interface Action {
  setSubject: (subject: Subject) => void;
}

const subjectStore = create<Store & Action>((set) => ({
  subject: null,
  setSubject: (subject) => set({ subject }),
}));

export const useSubjectStore = subjectStore;

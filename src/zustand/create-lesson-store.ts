import { IActivitySaved } from 'types/models/Activity';
import { create } from 'zustand';

interface State {
  initialActivity: IActivitySaved | null;
  secondActivity: IActivitySaved | null;
  finalActivity: IActivitySaved | null;
}

interface Action {
  setActivity: (activity: IActivitySaved) => void;
  clearActivity: () => void;
}

const createLessonStore = create<State & Action>((set) => ({
  initialActivity: null,
  secondActivity: null,
  finalActivity: null,

  setActivity: (activity) => {
    if (activity.type === 'Inicio') {
      set({ initialActivity: activity });
    } else if (activity.type === 'Desarrollo') {
      set({ secondActivity: activity });
    } else {
      set({ finalActivity: activity });
    }
  },
  clearActivity: () =>
    set({ initialActivity: null, secondActivity: null, finalActivity: null }),
}));

export const useCreateLesson = createLessonStore;

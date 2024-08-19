import { create } from 'zustand';
import { type IActivitySaved } from 'types/models/Activity';
import { type CreateReward } from 'types/validations/reward';

interface State {
  initialActivity: IActivitySaved | null;
  secondActivity: IActivitySaved | null;
  finalActivity: IActivitySaved | null;

  // rewards list
  rewards: CreateReward[];
}

interface Action {
  setActivity: (activity: IActivitySaved) => void;
  clearActivity: () => void;
  addReward: (reward: CreateReward) => void;
}

const createLessonStore = create<State & Action>((set) => ({
  initialActivity: null,
  secondActivity: null,
  finalActivity: null,
  rewards: [],

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
  addReward: (reward) =>
    set((state) => ({ rewards: [...state.rewards, reward] })),
}));

export const useCreateLesson = createLessonStore;

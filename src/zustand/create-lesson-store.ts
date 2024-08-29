import { create } from 'zustand';
import { type IActivitySaved } from 'types/models/Activity';
import { type CreateRewardForm } from 'types/validations/reward';

interface State {
  initialActivity: IActivitySaved | null;
  secondActivity: IActivitySaved | null;
  finalActivity: IActivitySaved | null;

  // rewards list
  rewards: Array<CreateRewardForm & { numberOfActivities: number }>;
}

interface Action {
  setActivity: (activity: IActivitySaved) => void;
  clearActivity: () => void;
  addReward: (
    reward: CreateRewardForm & {
      numberOfActivities: number;
    }
  ) => void;
  editReward: (
    reward: CreateRewardForm & {
      numberOfActivities: number;
    },
    index: number
  ) => void;
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
    set({
      initialActivity: null,
      secondActivity: null,
      finalActivity: null,
      rewards: [],
    }),
  addReward: (reward) =>
    set((state) => ({ rewards: [...state.rewards, reward] })),
  editReward: (reward, index) =>
    set((state) => ({
      rewards: state.rewards.map((mapReward, innerIndex) =>
        innerIndex === index ? reward : mapReward
      ),
    })),
}));

export const useCreateLesson = createLessonStore;

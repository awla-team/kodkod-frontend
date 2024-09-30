import { create } from 'zustand';
import type IActivity from 'types/models/Activity';
import { type IActivitySaved } from 'types/models/Activity';
import { type CreateRewardForm } from 'types/validations/reward';
import type IReward from 'types/models/Reward';

interface State {
  initialActivity: IActivitySaved | null;
  secondActivity: IActivitySaved | null;
  finalActivity: IActivitySaved | null;

  editLessonActivities: IActivity[];
  editLessonRewards: IReward[];
  // rewards list
  rewards: Array<CreateRewardForm & { numberOfActivities: number }>;
  // activities list
  activities: IActivitySaved[];
}

interface Action {
  setActivity: (activity: IActivitySaved) => void;
  setEditLessonData: (activities: IActivity[], rewards: IReward[]) => void;
  clearEditLessonData: () => void;
  clearNewLessonData: () => void;
  addEditLessonActivity: (activity: IActivity) => void;
  modifyEditLessonActivity: (activity: IActivity, index: number) => void;
  addEditLessonReward: (reward: IReward) => void;
  modifyEditLessonReward: (reward: IReward, index: number) => void;
  deleteEditLessonReward: (index: number) => void;

  addActivity: (activity: IActivitySaved) => void;
  editActivity: (activity: IActivitySaved, index: number) => void;
  deleteActivity: (index: number) => void;

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
  deleteReward: (index: number) => void;
}

const createLessonStore = create<State & Action>((set) => ({
  initialActivity: null,
  secondActivity: null,
  finalActivity: null,
  activities: [],
  editLessonActivities: [],
  editLessonRewards: [],
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
  setEditLessonData: (activities, rewards) =>
    set({ editLessonActivities: activities, editLessonRewards: rewards }),
  clearEditLessonData: () =>
    set({ editLessonActivities: [], editLessonRewards: [] }),
  clearNewLessonData: () =>
    set({
      initialActivity: null,
      secondActivity: null,
      finalActivity: null,
      activities: [],
      rewards: [],
    }),
  addEditLessonActivity: (activity) =>
    set((state) => ({
      editLessonActivities: [...state.editLessonActivities, activity],
    })),
  modifyEditLessonActivity: (activity, index) =>
    set((state) => ({
      editLessonActivities: state.editLessonActivities.map(
        (mapActivity, innerIndex) =>
          innerIndex === index ? activity : mapActivity
      ),
    })),
  addEditLessonReward: (reward) =>
    set((state) => ({
      editLessonRewards: [...state.editLessonRewards, reward],
    })),
  modifyEditLessonReward: (reward, index) =>
    set((state) => ({
      editLessonRewards: state.editLessonRewards.map((mapReward, innerIndex) =>
        innerIndex === index ? reward : mapReward
      ),
    })),
  deleteEditLessonReward: (index) =>
    set((state) => ({
      editLessonRewards: state.editLessonRewards.splice(index, 1),
    })),

  addActivity: (activity) =>
    set((state) => ({ activities: [...state.activities, activity] })),
  editActivity: (activity, index) =>
    set((state) => ({
      activities: state.activities.map((mapActivity, innerIndex) =>
        innerIndex === index ? activity : mapActivity
      ),
    })),
  deleteActivity: (index) =>
    set((state) => ({
      activities: state.activities.splice(index, 1),
    })),

  addReward: (reward) =>
    set((state) => ({ rewards: [...state.rewards, reward] })),
  editReward: (reward, index) =>
    set((state) => ({
      rewards: state.rewards.map((mapReward, innerIndex) =>
        innerIndex === index ? reward : mapReward
      ),
    })),
  deleteReward: (index) =>
    set((state) => ({
      rewards: state.rewards.splice(index, 1),
    })),
}));

export const useCreateLesson = createLessonStore;

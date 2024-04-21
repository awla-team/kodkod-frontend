import { type AxiosPromise } from 'axios';
import { type IReward } from 'global/interfaces';

export interface IRewardCardProps {
  id?: string | number;
  onSave: (rewardId: number | string, body: Partial<IReward>) => AxiosPromise;
  rewardId: number;
  title: string;
  icon: string;
  description: string;
  requiredPoints: number | string;
  type: string;
  order?: number;
  usedCount?: number;
}

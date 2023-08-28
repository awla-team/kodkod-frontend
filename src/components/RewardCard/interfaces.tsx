export interface IRewardCardProps {
  edit?: any;
  rewardId: number;
  title: string;
  icon: string;
  description: string;
  requiredPoints: number | string;
  type: string;
  order?: number;
  usedCount?: number;
}

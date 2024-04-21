import { type ISkill } from '../../global/interfaces';

export interface ISkillPointsProps {
  skill: ISkill & { points: number };
  dark?: boolean;
}

export interface IIconContainerProps {
  background?: string;
}

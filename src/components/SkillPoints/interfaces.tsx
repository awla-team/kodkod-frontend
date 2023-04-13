import { ISkill } from '../../global/interfaces';

export interface ISkillPointsProps {
  skill: ISkill & { points: number };
  dark?: Boolean;
}

export interface IIconContainerProps {
  background?: string;
}

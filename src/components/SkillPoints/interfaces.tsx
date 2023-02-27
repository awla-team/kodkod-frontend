import { ISkill } from "../../global/interfaces";

export interface ISkillPointsProps {
  skill: ISkill & { points: number };
}

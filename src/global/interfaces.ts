import "styled-components";
import { Theme } from "@mui/material/styles";
import Missions from "../routes/Class/Adventures/Adventure/Missions";

interface CustomTheme {
  bg?: {
    main: string;
    light: string;
  };
  text?: {
    main: string;
    light: string;
  };
}

declare module "@mui/material/styles" {
  interface Theme extends CustomTheme {}

  interface ThemeOptions extends CustomTheme {}
}

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}

export interface ISkill {
  id: string;
  title: string;
  icon: string;
  color: string;
  points: number;
}

export interface IAdventureSkill {
  id: number;
  skillId: number;
  points: number;
  skill?: ISkill;
}

export interface IAdventure {
  id: number;
  title: string;
  stagesDuration: number;
  thumbnail: string;
  banner: string;
  category: string;
  overview: string;
  expectedResults: string[];
  skills?: ISkill[];
  template_stages?: TemplateStages[];
  stages: IStage[];

  missions: IMission[];
}

export interface TemplateStages {
  id: number;
  title: string;
  icon: string;
  missions?: IMission[];
}

export interface IStage extends TemplateStages {
  _index: number;
}

export interface IMission {
  id: string;
  title: string;
  description: string;
  points: number;
  id_skill: number;
  skill?: ISkill;
  difficulty: "easy" | "normal" | "hard";
}

export interface IReward {
  id: number;
  adventureId: number;
  title: string;
  description: string;
  requiredPoints: number;
  icon: string;
  type: string;
}

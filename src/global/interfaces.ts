import "styled-components";
import { Theme } from "@mui/material/styles";

declare module '@mui/material/styles/createPalette' {
  interface Palette {
      highlight: Palette['primary'];
  }
  interface PaletteOptions {
      highlight: PaletteOptions['primary'];
  }
}

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
}

export interface TemplateStages {
  id: number;
  title: string;
  icon: string;

  id_adventure: number;

  missions?: IMission[];
}

export interface IStage {
  id: number;
  adventureId: number;
  index: number;
  title: string;
  icon: string;
  description?: string;
}

export interface IMission {
  id: string;
  stageId: string;
  title: string;
  description: string;
  points: number;
  qr: string;
  skillId: number;
  skill?: ISkill;
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

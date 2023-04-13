import 'styled-components';
import { Theme } from '@mui/material/styles';

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

declare module '@mui/material/styles' {
  interface Theme extends CustomTheme {}

  interface ThemeOptions extends CustomTheme {}
}

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    highlight: Palette['primary'];
    pink: Palette['primary'];
  }
  interface PaletteOptions {
    highlight: PaletteOptions['primary'];
    pink: Palette['primary'];
  }
}

declare module 'styled-components' {
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

export interface IClassHasAdventure {
  id: number;
  id_class: number;
  id_adventure: number;
  date_start?: string;
  date_stop?: string;
}

export interface IClass {
  id?: number;
  id_level?: number;
  level?: string;
  code?: string;
  alias?: string;
  id_user?: number;
  current_adventure?: IAdventure;
}

export interface IUser {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
  id_school: number;
  academic_subject: string;
  user_has_rewards?: IUserHasReward[];
  missions?: IMission[];
  verified: boolean;
}

export interface IAdventure {
  id: number;
  title: string;
  thumbnail: string;
  finish_img_url: string;
  banner: string;
  category: string;
  overview: string;
  class_has_adventures?: IClassHasAdventure[];
  expected_results: string;
  skills?: ISkill[];
  template_stages?: TemplateStages[];
  stages: IStage[];

  id_class_has_adventure?: number;
  missions: IMission[];

  expectedResults: string[];
}

export interface TemplateStages {
  _index: number;
  id: number;
  title: string;
  icon: string;
  missions?: IMission[];
}

export interface IStage extends TemplateStages {
  _index: number;
  active: boolean;
  next_img_url: string;
  narrative: string;
}

export interface IMission {
  id: string | number;
  title: string;
  description: string;
  points: number;
  id_skill?: number;
  skill?: ISkill;
  completed_users: IUser[];
  difficulty: 'easy' | 'normal' | 'hard';
}

export interface IReward {
  id: number;
  adventureId: number;
  title: string;
  description: string;
  required_points: number;
  icon: string;
  type: string;
}

export interface IUserHasReward {
  id: number;
  created_at: Date;
  updated_at: Date;
  used_at: Date;
  id_reward: number;
  id_user: number;
  reward?: IReward;
}

export interface ISchool {
  id: number;
  id_address: number;
  name: string;
  phone: string;
}

export interface SignInResponseType {
  accessToken: string;
  refreshToken: string;
}

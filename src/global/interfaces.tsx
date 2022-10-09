import 'styled-components';
import { Theme } from '@mui/material/styles';
interface CustomTheme {
    bg?: {
        main: string,
        light: string
    },    
    text?: {
        main: string,
        light: string
    }
}

declare module '@mui/material/styles' {
    interface Theme extends CustomTheme {}
    interface ThemeOptions extends CustomTheme {}
}

declare module 'styled-components' {
    export interface DefaultTheme extends Theme {}
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
    skills: {
      metacognition?: number;
      comunication?: number;
      personalDevelopment?: number;
      citizenship?: number;
      collaboration?: number;
      criticalThinking?: number;
      creativity?: number;
    };
};
  
export interface ISkill {
    text: string;
    img: string;
}
  
export interface ISkillsMap {
    metacognition: ISkill;
    comunication: ISkill;
    personalDevelopment: ISkill;
    citizenship: ISkill;
    collaboration: ISkill;
    criticalThinking: ISkill;
    creativity: ISkill;
}
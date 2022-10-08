import symbolMetacognition from './../assets/images/symbol-metacognition.png';
import symbolComunication from './../assets/images/symbol-comunication.png';
import symbolPersonalDevelopment from './../assets/images/symbol-personal-development.png';
import symbolCitizenship from './../assets/images/symbol-citizenship.png';
import symbolCollaboration from './../assets/images/symbol-collaboration.png';
import symbolCriticalThinking from './../assets/images/symbol-critical-thinking.png';
import symbolCreativity from './../assets/images/symbol-creativity.png';
import { ISkillsMap } from './interfaces';

export const skillsMap: ISkillsMap = {
    metacognition: {
      text: 'Metacognición',
      img: symbolMetacognition,
    },
    comunication: {
      text: 'Comunicación',
      img: symbolComunication,
    },
    personalDevelopment: {
      text: 'Crecimiento personal',
      img: symbolPersonalDevelopment,
    },
    citizenship: {
      text: 'Ciudadanía',
      img: symbolCitizenship,
    },
    collaboration: {
      text: 'Colaboratividad',
      img: symbolCollaboration,
    },
    criticalThinking: {
      text: 'Pensamiento crítico',
      img: symbolCriticalThinking,
    },
    creativity: {
      text: 'Creatividad',
      img: symbolCreativity,
    },
};
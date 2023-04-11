import React from "react";
import AngryIconFilled from "components/SVG/AngryIconFilled";
import AngryIconOutlined from "components/SVG/AngryIconOutlined";
import GoodIconFilled from "components/SVG/GoodIconFilled";
import GoodIconOutlined from "components/SVG/GoodIconOutlined";
import HappyIconFilled from "components/SVG/HappyIconFilled";
import HappyIconOutlined from "components/SVG/HappyIconOutlined";
import NeutralIconFilled from "components/SVG/NeutralIconFilled";
import NeutralIconOutlined from "components/SVG/NeutralIconOutlined";
import SadIconFilled from "components/SVG/SadIconFilled";
import SadIconOutlined from "components/SVG/SadIconOutlined";
import { IScoreOption } from "./interfaces";

export const challengeOptions: string[] = [
  'Problemas de conducta, disciplina y comportamiento de los estudiantes en la clase',
  'Problemas de comprensión, asimilación y retención de información por parte de los estudiantes',
  'Desmotivación, desinterés o aburrimiento por parte de los estudiantes',
  'Problemas relacionados con las emociones y relaciones entre los estudiantes',
  'Problemas de logística y organización de la clase, falta de materiales o la falta de tiempo',
  'Sin incidencias'
];

export const mostRemarkableOptions: string[] = [
  'Buen rendimiento y desempeño académico de los estudiantes',
  'Desarrollo personal y social de los estudiantes',
  'Innovación y creatividad, uso efectivo de recursos didácticos y tecnológicos',
  'Promoción de la inclusión y la diversidad en el aula',
  'Mejora en la comunicación y colaboración entre el profesor o los estudiantes',
  'Sin novedades'
];

export const radioOptions: IScoreOption[] = [
  {
    text: "Muy malo",
    value: 0,
    icon: <AngryIconOutlined />,
    selectedIcon: <AngryIconFilled />,
  },
  {
    text: "Malo",
    value: 1,
    icon: <SadIconOutlined />,
    selectedIcon: <SadIconFilled />,
  },
  {
    text: "Neutral",
    value: 2,
    icon: <NeutralIconOutlined />,
    selectedIcon: <NeutralIconFilled />,
  },
  {
    text: "Bueno",
    value: 3,
    icon: <GoodIconOutlined />,
    selectedIcon: <GoodIconFilled />,
  },
  {
    text: "Muy bueno",
    value: 4,
    icon: <HappyIconOutlined />,
    selectedIcon: <HappyIconFilled />,
  },
];

import React from 'react';
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
    'Obstáculo 1',
    'Obstáculo 2',
    'Obstáculo 3',
];

export const mostRemarkableOptions: string[] =  [
    'Logro 1',
    'Logro 2',
    'Logro 3',
];

export const radioOptions: IScoreOption[] = [
    {
        text: 'Muy malo',
        value: 0,
        icon: <AngryIconOutlined />,
        selectedIcon: <AngryIconFilled />,    
    },
    {
        text: 'Malo',
        value: 1,
        icon: <SadIconOutlined />,
        selectedIcon: <SadIconFilled />,    
    },
    {
        text: 'Neutral',
        value: 2,
        icon: <NeutralIconOutlined />,
        selectedIcon: <NeutralIconFilled />,    
    },
    {
        text: 'Bueno',
        value: 3,
        icon: <GoodIconOutlined />,
        selectedIcon: <GoodIconFilled />,    
    },
    {
        text: 'Muy bueno',
        value: 4,
        icon: <HappyIconOutlined />,
        selectedIcon: <HappyIconFilled />,    
    },
];
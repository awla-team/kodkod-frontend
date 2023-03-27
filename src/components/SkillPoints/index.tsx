import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Point from "../Point";
import { ISkillPointsProps } from "./interfaces";
import { SkillPointsContainer } from "./styled";
import { ISkill } from "../../global/interfaces";
import { getSkill } from "../../services/skills";
import { Typography } from "@mui/material";

interface IIconContainerProps {
  background?: string;
}

const IconContainer = styled.div`
  background: ${(props: IIconContainerProps) => props.background || "#000"};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 36px;

  img {
    height: 16px;
    width: 16px;
    &.blank-icon{
      background: #D9D9D9;
      border-radius: 50%;
    }
  }
`;

const SkillPoints: React.FC<ISkillPointsProps> = ({ skill }) => {
  return (
    <SkillPointsContainer className="d-flex align-items-center mb-1">
      {skill ? (
        <>
          <IconContainer background={skill.color} className="me-2">
            <img className={!skill.icon?"" :"blank-icon"} src={skill.icon} />
          </IconContainer>
          <Typography component="span" variant="body1" className="me-2">{skill.title}</Typography>
          <div className="d-flex">
            <Point highlighted={skill.points > 0} />
            <Point highlighted={skill.points > 1} />
            <Point highlighted={skill.points > 2} />
          </div>
        </>
      ) : null}
    </SkillPointsContainer>
  );
};

export default SkillPoints;

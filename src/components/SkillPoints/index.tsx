import React, { useState, useEffect } from "react";
import { ISkillPointsProps } from "./interfaces";
import { IconContainer, SkillPointsContainer } from "./styled";
import { Box, Typography } from "@mui/material";



const SkillPoints: React.FC<ISkillPointsProps> = ({ skill, dark }) => {
  return (
    <SkillPointsContainer className={`d-flex align-items-center mb-1 ${dark ? 'dark-colors' : ''}`}>
      {skill ? (
        <>
          <IconContainer background={skill.color} className="me-2">
            <img className={!skill.icon?"" :"blank-icon"} src={skill.icon} />
          </IconContainer>
          <Typography component="span" variant="body1" className="me-2">{skill.title}</Typography>
          <div className="d-flex">
            <Box sx={{ background: skill.points > 0 ? skill.color : 'lightgray' }} className="skill-point" />
            <Box sx={{ background: skill.points > 1 ? skill.color : 'lightgray' }} className="skill-point" />
            <Box sx={{ background: skill.points > 2 ? skill.color : 'lightgray' }} className="skill-point" />
          </div>
        </>
      ) : null}
    </SkillPointsContainer>
  );
};

export default SkillPoints;

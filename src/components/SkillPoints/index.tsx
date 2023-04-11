import React, { useState, useEffect } from "react";
import { ISkillPointsProps } from "./interfaces";
import { IconContainer, SkillPointsContainer } from "./styled";
import { Box, Chip, Typography } from "@mui/material";

const SkillPoints: React.FC<ISkillPointsProps> = ({ skill, dark }) => {
  return (
    <SkillPointsContainer
      className={`d-flex align-items-center justify-content-center mb-1 ${
        dark ? "dark-colors" : ""
      }`}
    >
      {skill ? (
        <>
          <Chip
            label={skill.title}
            sx={{ background: skill.color, color: "#FFF", fontSize: "12px" }}
            size="small"
          />
        </>
      ) : null}
    </SkillPointsContainer>
  );
};

export default SkillPoints;

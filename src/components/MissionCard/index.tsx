import React from "react";
import styled from "styled-components";
import { Card, Typography } from "@mui/material";
import kodcoinIcon from "assets/images/kodcoin.png";
import SwitchIcon from "assets/images/switch.svg";

interface IMissionCardContainerProps {
  background?: string;
}

interface IMissionCardProps {
  title: string;
  description: string;
  points: number;
  icon: string;
  color: string;
}

const SkillIconContainer = styled.div`
  border: 1px solid #fff;
  width: fit-content;
  border-radius: 24px;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 24px;
    height: 24px;
  }
`;

const PointsContainer = styled.div`
  position: absolute;
  right: 10px;
  background-color: #fff;
  color: #717171;
  text-align: center;
  padding: 4px 8px;
  border-radius: 4vmax;
  border: 1px solid #000000;
  

  &.bottom-position {
    bottom: -20px;
  }

  &.fixed-width-height {
    width: 185px;
    height: 40px;
  }

  &.top-position {
    top: -16px;
  }

  img {
    height: 16px;
    width: 16px;
  }
`;


const MissionCardContainer = styled(Card)`
  &.MuiPaper-root {
    position: relative;
    background: #dadada;
    border-radius: 8px;
    margin-block: 1rem;
    overflow: visible;
  }
`;

const MissionCard: React.FC<IMissionCardProps> = ({
  title,
  description,
  points,
  icon,
  color,
}) => (
  <MissionCardContainer className="mission-card p-4 d-flex" variant="outlined">
    <div className="d-flex flex-column me-3 align-items-between justify-content-between">
      <div className="d-flex align-items-center">
        <SkillIconContainer className="me-3">
          <img src={icon} />
        </SkillIconContainer>
        <Typography variant="h6" fontWeight="bold">
          {title}
        </Typography>
      </div>
      <div className="mt-2">
        <Typography>{description}</Typography>
      </div>
      <PointsContainer className="d-flex align-items-center justify-content-center bottom-position fixed-width-height">
        <Typography className="me-1" variant="h5" fontWeight="bold">
          {points}
        </Typography>
        <img src={kodcoinIcon} />
      </PointsContainer>

      <PointsContainer className="d-flex align-items-center justify-content-center top-position">
        <img src={SwitchIcon} />
      </PointsContainer>
    </div>
  </MissionCardContainer>
);

export default MissionCard;

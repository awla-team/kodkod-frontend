import React from "react";
import { Typography } from "@mui/material";
import kodcoinIcon from "assets/images/kodcoin.png";
import { difficultyIcons, difficultyToText } from "utils";
import CachedIcon from '@mui/icons-material/Cached';
import { MissionCardContainer, ChangeMissionButton, PointsContainer } from "./styled";
import { IMissionCardProps } from "./interfaces";

const MissionCard: React.FC<IMissionCardProps> = ({ mission, openModal, onClick, selected, clickable }) => {
  const { title, description, points, difficulty } = mission;

  return (
    <MissionCardContainer
      onClick={onClick}
      className={"mission-card p-4 d-flex justify-content-between" + (selected ? " selected" : "") + (clickable ? " clickable" : "")}
      variant="outlined"
      sx={{ background: mission.skill.color }}
    >
      <div className="d-flex flex-column justify-content-between">
        <div className={"text__details"}>
          <Typography variant="h6" fontWeight="bold">
            {title}
          </Typography>
          <Typography className="mt-1">{description}</Typography>
        </div>
        <div className="d-flex gap-4">
          <div className="d-flex align-items-end justify-content-center gap-1">
            {difficultyIcons[difficulty]}
            <Typography component="span" variant="body2">{difficultyToText(difficulty)}</Typography>
          </div>
          <div className="d-flex align-items-center justify-content-center gap-1">
            <div style={{ borderRadius: '100%', height: '12px', width: '12px', background: '#fff' }} />
            <Typography component="span" variant="body2">{mission?.skill?.title}</Typography>
          </div>
        </div>

        {/* Action Buttons with absolute position */}        
        {openModal && (
          <ChangeMissionButton
            className="d-flex align-items-center justify-content-center"
            variant="contained"
            color="info"
            onClick={(e) => {
              e.stopPropagation();
              openModal(mission);
            }}
          >
            <CachedIcon sx={{ fill: 'rgba(0, 0, 0, 0.8)' }} />
          </ChangeMissionButton>
        )}
        {/* Action Buttons with absolute position end*/}
      </div>
      <div className="d-flex align-items-center">
        <PointsContainer className="d-flex align-items-center justify-content-center">
          <Typography className="me-1" variant="h5" fontWeight="bold">{points}</Typography>
          <img src={kodcoinIcon} />
        </PointsContainer>
      </div>
      
    </MissionCardContainer>
  );
};

export default MissionCard;

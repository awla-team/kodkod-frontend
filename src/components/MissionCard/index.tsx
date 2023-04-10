import React from "react";
import { Tooltip, Typography } from "@mui/material";
import kodcoinIcon from "assets/images/kodcoin.png";
import { difficultyIcons, difficultyToText } from "utils";
import CachedIcon from "@mui/icons-material/Cached";
import {
  MissionCardContainer,
  ChangeMissionButton,
  PointsContainer,
} from "./styled";
import { IMissionCardProps } from "./interfaces";
import SchoolIcon from "@mui/icons-material/School";

const MissionCard: React.FC<IMissionCardProps> = ({
  mission,
  openModal,
  onClick,
  selected,
  clickable,
}) => {
  const { title, description, points, difficulty, completed_users } = mission;

  return (
    <MissionCardContainer
      onClick={onClick}
      className={
        "mission-card p-4 d-flex justify-content-between" +
        (selected ? " selected" : "") +
        (clickable ? " clickable" : "")
      }
      variant="outlined"
      sx={{ background: mission.skill.color }}
    >
      <div className="d-flex flex-column justify-content-between w-100 pe-4">
        <div className={"text__details"}>
          <Typography variant="h6" fontWeight="bold">
            {title}
          </Typography>
          <Typography className="mt-1 w-100">{description}</Typography>
        </div>
        <div className="d-flex justify-content-between">
          <div className="d-flex gap-4 align-items-center">
            <div className="d-flex align-items-end justify-content-center gap-1">
              {difficultyIcons[difficulty]}
              <Typography component="span" variant="body2">
                {difficultyToText(difficulty)}
              </Typography>
            </div>
            <div className="d-flex align-items-center justify-content-center gap-1">
              <div
                style={{
                  borderRadius: "100%",
                  height: "12px",
                  width: "12px",
                  background: "#fff",
                }}
              />
              <Typography component="span" variant="body2">
                {mission?.skill?.title}
              </Typography>
            </div>
          </div>
          {completed_users ? (
            <Tooltip
              title={`${completed_users?.length} estudiantes han completado esta misión`}
            >
              <div className="d-flex align-items-center justify-content-center gap-1">
                <SchoolIcon fontSize="small" />
                <Typography component="span" variant="body2">
                  {completed_users?.length}
                </Typography>
              </div>
            </Tooltip>
          ) : null}
        </div>

        {/* Action Buttons with absolute position */}
        {openModal && !completed_users.length ? (
          <ChangeMissionButton
            className="d-flex align-items-center justify-content-center"
            disabled={!!completed_users.length}
            variant="contained"
            color="info"
            onClick={(e) => {
              e.stopPropagation();
              openModal(mission);
            }}
          >
            <CachedIcon sx={{ fill: "rgba(0, 0, 0, 0.8)" }} />
          </ChangeMissionButton>
        ) : null}
        {/* Action Buttons with absolute position end*/}
      </div>
      <div className="d-flex align-items-center">
        <PointsContainer className="d-flex align-items-center justify-content-center">
          <Typography className="me-1" variant="h5" fontWeight="bold">
            {points}
          </Typography>
          <img src={kodcoinIcon} />
        </PointsContainer>
      </div>
    </MissionCardContainer>
  );
};

export default MissionCard;

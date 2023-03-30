import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { Box, Button, Card, Typography } from "@mui/material";
import kodcoinIcon from "assets/images/kodcoin.png";
import SwitchIcon from "assets/images/switch.svg";
import { difficultyToText, putDifficultyClass } from "utils";
import { IMission } from "../../global/interfaces";
import SignalCellularAlt1BarIcon from '@mui/icons-material/SignalCellularAlt1Bar';
import SignalCellularAlt2BarIcon from '@mui/icons-material/SignalCellularAlt2Bar';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import CachedIcon from '@mui/icons-material/Cached';

interface IMissionCardContainerProps {
  background?: string;
}

export interface MissionCardType {
  id: number | string;
  title: string;
  description: string;
  points: number;

  difficulty: string;
}

interface IMissionCardProps {
  mission: IMission;
  openModal?: (mission: IMission) => void;
  selected?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

export const ChangeMissionButton = styled(Button)`
  position: absolute;
  right: 10px;
  top: -24px;
  height: 40px;
  width: 40px;
  border-radius: 100%;
  box-shadow: 0 0 2px rgba(33, 33, 33, 0.4);
  min-width: unset;
`;

export const PointsContainer = styled.div`
  background: #fff;
  color: rgba(0, 0, 0, 0.8);
  border-radius: 8px;
  width: 120px;
  height: 100%;

  img {
    width: 30px;
  }
`;

export const Chip = styled(Box)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 4vmax;
  font-weight: 700;
  padding: 0.2rem 0.5rem;
  text-transform: capitalize;

  &.variant__contained {
    background: #a5a5a5;
    color: #ffffff;
    border: 1px solid #a5a5a5;

    & .icon {
      width: 16px;
      height: 16px;
      background: #808080;
      border-radius: 50%;
    }
  }

  &.variant__outlined {
    background: transparent;
    color: #000000;
    border: 1px solid #a5a5a5;
    gap: 0.3rem;

    & .level__icon {
      position: relative;
      height: 11px;
      width: 2px;
      border-radius: 2px;
      background: #bbbbbb;
      margin-inline: 7px;
      margin-block-start: 1px;

      &.level__easy:before {
        background: #231f20;
      }

      &.level__normal {
        background: #231f20;

        &:before {
          background: #231f20;
        }
      }

      &.level__hard {
        background: #231f20;

        &:before,
        &:after {
          background: #231f20;
        }
      }

      &:before {
        position: absolute;
        left: -5px;
        bottom: 0;
        content: "";
        height: 8px;
        display: block;
        width: 2px;
        border-radius: 2px;
        background: #bbbbbb;
      }

      &:after {
        position: absolute;
        right: -5px;
        bottom: 0;
        content: "";
        height: 15px;
        display: block;
        width: 2px;
        border-radius: 2px;
        background: #bbbbbb;
      }
    }
  }
`;

const MissionCardContainer = styled(Card)`
  width: 420px;
  height: 200px;
  &.MuiPaper-root {
    cursor: pointer;
    position: relative;
    color: #fff;
    border-radius: 8px;
    margin-block: 1rem;
    overflow: visible;
    border: 4px solid transparent;

    &.selected {
      border-color: #000;
      background: #fff;
    }
  }

  & .chip__tag__container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-block: 0.5rem;
  }
`;

const difficultyIcons = {
  easy: <SignalCellularAlt1BarIcon />,
  normal: <SignalCellularAlt2BarIcon />,
  hard: <SignalCellularAltIcon />,
}

const MissionCard: React.FC<IMissionCardProps> = (props) => {
  const { mission, openModal, onClick, selected } = props;

  const { title, description, points, difficulty } = mission;

  return (
    <MissionCardContainer
      onClick={onClick}
      className={"mission-card p-4 d-flex justify-content-between" + (selected ? " selected" : "")}
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
          <div className="d-flex align-items-center justify-content-center gap-1">
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

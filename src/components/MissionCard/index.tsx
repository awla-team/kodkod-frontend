import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { Box, Card, Typography } from "@mui/material";
import kodcoinIcon from "assets/images/kodcoin.png";
import SwitchIcon from "assets/images/switch.svg";

interface IMissionCardContainerProps {
  background?: string;
}

export interface MissionCardType {
  title: string;
  description: string;
  points: number;
  icon: string;
  color: string;
}

interface IMissionCardProps extends MissionCardType {
  openModal?: (mission: MissionCardType) => void;
  selected?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

export const PointsContainer = styled.button`
  position: absolute;
  right: 10px;
  background-color: #fff;
  color: #717171;
  text-align: center;
  padding: 4px 8px;
  border-radius: 4vmax;
  border: 1px solid #000000;
  cursor: pointer;
  outline: none;

  &:hover {
    outline: none;
    border: 1px solid #000000;
  }

  &.bottom-position {
    bottom: -20px;
  }

  &.fixed-width-height {
    width: 185px;
    height: 40px;
  }

  &.top-position {
    top: -16px;
    width: 48px;
    height: 32px;
  }

  img {
    height: 16px;
    width: 16px;
  }
`;

export const Chip = styled(Box)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 4vmax;
  font-weight: 700;
  padding: 0.2rem 0.5rem;

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

      &.level__medium {
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
  &.MuiPaper-root {
    cursor: pointer;
    position: relative;
    background: #dadada;
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

const MissionCard: React.FC<IMissionCardProps> = (props) => {
  const {
    title,
    description,
    points,
    icon,
    color,
    openModal,
    onClick,
    selected,
  } = props;
  return (
    <MissionCardContainer
      onClick={onClick}
      className={"mission-card p-4 d-flex" + (selected ? " selected" : "")}
      variant="outlined"
    >
      <div className="d-flex flex-column">
        <div className={"chip__tag__container"}>
          <Chip className={"variant__outlined"}>
            <span className={"level__icon level__easy"} />
            <span>Easy</span>
          </Chip>
          <Chip className={"variant__contained"}>
            <span className={"icon"} />
            <span>Collaboration</span>
          </Chip>
        </div>
        <div className={"text__details"}>
          <Typography variant="h6" fontWeight="bold">
            {title}
          </Typography>
          <Typography sx={{ mt: 1 }}>{description}</Typography>
        </div>

        {/* Action Buttons with absolute position */}
        <PointsContainer className="d-flex align-items-center justify-content-center bottom-position fixed-width-height">
          <Typography className="me-1" variant="h5" fontWeight="bold">
            {points}
          </Typography>
          <img src={kodcoinIcon} />
        </PointsContainer>
        {openModal && (
          <PointsContainer
            className="d-flex align-items-center justify-content-center top-position"
            onClick={(e) => {
              e.stopPropagation();
              openModal(props);
            }}
          >
            <img src={SwitchIcon} />
          </PointsContainer>
        )}
        {/* Action Buttons with absolute position end*/}
      </div>
    </MissionCardContainer>
  );
};

export default MissionCard;

import React from 'react';
import styled from 'styled-components';
import { Card, Typography } from '@mui/material';
import kodcoinIcon from './../../assets/images/kodcoin.png';

interface IMissionCardContainerProps {
  background?: string;
};

interface IMissionCardProps {
  title: string;
  description: string;
  qr: string;
  points: number;
  icon: string;
  color: string;
};

const SkillIconContainer = styled.div`
  border: 1px solid #FFF;
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
  background-color: #FFF;
  border-radius: 8px;
  color: #717171;
  text-align: center;
  padding: 4px 8px;
  img {
    height: 24px;
    width: 24px;
  }
`;

const QRContainer = styled.div`
  img {
    height: 160px;
    width: 160px;
  }
`;

const MissionCardContainer = styled(Card)`  
  &.MuiPaper-root {
    background-color: ${(props: IMissionCardContainerProps) => props.background || '#000'};
    border-radius: 8px;
    color: #FFF;
  }
`;

const MissionCard: React.FC<IMissionCardProps> = ({ title, description, qr, points, icon, color }) => (
  <MissionCardContainer background={color} className="mission-card p-4 d-flex" variant="outlined">
    <div className="d-flex flex-column me-3 align-items-between justify-content-between">
      <div className="d-flex align-items-center">
        <SkillIconContainer className="me-3">
          <img src={icon} />
        </SkillIconContainer>
        <Typography variant="h6" fontWeight="bold">{title}</Typography>
      </div>
      <div className="mt-2">
        <Typography>{description}</Typography>
      </div>
      <PointsContainer className="d-flex mt-3 align-items-center justify-content-center">
        <Typography className="me-1" variant="h5" fontWeight="bold">{points}</Typography>
        <img src={kodcoinIcon} />
      </PointsContainer>
    </div>
    <QRContainer className="qr-container">
      <img src={qr} />
    </QRContainer>
  </MissionCardContainer>
);

export default MissionCard;

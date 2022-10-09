import React from 'react';
import { Typography } from '@mui/material';
import { IAdventureCardProps } from './interfaces';
import { AdventureCardContainer } from './styled';

const AdventureCard: React.FC<IAdventureCardProps> = ({ title, stagesDuration, img, info }) => (
  <AdventureCardContainer className="p-4 d-flex flex-column justify-content-between" img={img} variant="outlined">
    <div> 
      <Typography variant="body1">{`${stagesDuration} etapas`}</Typography>
      <Typography variant="h5">
        <b>{title}</b>
      </Typography>     
    </div>      
    {info}      
  </AdventureCardContainer>
);

export default AdventureCard;

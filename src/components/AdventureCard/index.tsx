import React from 'react';
import { Chip, Typography } from '@mui/material';
import { IAdventureCardProps } from './interfaces';
import { AdventureCardContainer } from './styled';

const AdventureCard: React.FC<IAdventureCardProps> = ({ title, completed, img, info, onClick }) => {
  return (
    <AdventureCardContainer
      onClick={!completed ? onClick : () => {}}
      className={`p-4 d-flex flex-column justify-content-between ${
        completed ? 'adventure-complete' : ''
      }`}
      sx={{ backgroundImage: `url(${img})` }}
      variant="outlined"
    >
      <div>
        {completed ? (
          <div className="adventure-complete-chip d-flex align-items-center justify-content-center">
            <Chip color="success" label="Aventura completada" />
          </div>
        ) : null}
        <Typography variant="h5">
          <b>{title}</b>
        </Typography>
      </div>
      {info}
    </AdventureCardContainer>
  );
};

export default AdventureCard;

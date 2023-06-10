import React from 'react';
import { Chip, Typography } from '@mui/material';
import { IAdventureCardProps } from './interfaces';
import { AdventureCardContainer } from './styled';
import StarIcon from '@mui/icons-material/Star';

const AdventureCard: React.FC<IAdventureCardProps> = ({
  title,
  completed,
  demo,
  img,
  info,
  onClick,
}) => {
  return (
    <AdventureCardContainer
      onClick={!completed ? onClick : () => {}}
      className={`p-4 d-flex flex-column justify-content-between ${
        completed ? 'adventure-complete' : ''
      }`}
      sx={{ backgroundImage: `url(${img})` }}
      variant="outlined"
    >
      {!demo ? (
        <div className="demo-indicator gap-1">
          <StarIcon fontSize="small" sx={{ fontSize: '16px' }} />
          <Typography fontWeight="bold" variant="body2">
            Pro
          </Typography>
        </div>
      ) : null}
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

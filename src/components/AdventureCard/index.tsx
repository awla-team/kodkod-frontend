import React from 'react';
import { Chip, Typography } from '@mui/material';
import { IAdventureCardProps } from './interfaces';
import { AdventureCardContainer } from './styled';
import StarIcon from '@mui/icons-material/Star';

const AdventureCard: React.FC<IAdventureCardProps> = ({
  id,
  title,
  startDate,
  endDate,
  demo,
  img,
  info,
  onClick,
}) => {
  return (
    <AdventureCardContainer
      id={id || null}
      onClick={onClick}
      className="p-4 d-flex flex-column justify-content-between"
      sx={{
        backgroundImage: `url(${img})`,
        backgroundSize: 'cover',
        overflow: 'visible',
      }}
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
        <Typography variant="h5">
          <b>{title}</b>
        </Typography>
        <div className="d-flex flex-column justify-content-center mt-2">
          {startDate ? <Typography variant="body2">Iniciada: {startDate}</Typography> : null}
          {endDate ? <Typography variant="body2">Finalizada: {endDate}</Typography> : null}
        </div>
      </div>
      {info}
    </AdventureCardContainer>
  );
};

export default AdventureCard;

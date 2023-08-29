import React, { useState } from 'react';
import { Typography, TextField, IconButton } from '@mui/material';
import { IRewardCardProps } from './interfaces';
import { CustomCard } from './styled';
import kodcoinIcon from './../../assets/images/kodcoin.png';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import http from 'global/api';

const RewardCard: React.FC<IRewardCardProps> = ({
  id,
  edit,
  rewardId,
  title,
  icon,
  description,
  requiredPoints,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  const cancelEditMode = () => {
    setNewTitle(title);
    setNewDescription(description);
    setEditMode(false);
  };

  const activateEditMode = () => {
    setEditMode(true);
  };

  const editReward = () => {
    edit(rewardId, newTitle, newDescription)
      .then((result: any) => {
        if (result?.data?.responseData === 1) setEditMode(false);
      })
      .catch((err: any) => {
        console.error(err);
      });
  };

  return (
    <CustomCard
      id={`reward-card-${id}`}
      variant="outlined"
      className="d-flex flex-column py-4 px-3 mb-3 align-items-center position-relative"
    >
      {editMode ? (
        <div
          id={`reward-card-edit-${id}`}
          className="d-flex"
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
          }}
        >
          <IconButton color="primary" onClick={editReward}>
            <CheckIcon />
          </IconButton>
          <IconButton color="error" onClick={cancelEditMode}>
            <CloseIcon />
          </IconButton>
        </div>
      ) : rewardId ? (
        <IconButton
          id={`reward-card-edit-${id}`}
          sx={{
            position: 'absolute',
            top: '10px',
            right: '10px',
          }}
          color="inherit"
          onClick={activateEditMode}
        >
          <EditIcon />
        </IconButton>
      ) : null}
      <div className="d-flex reward-img flex-fill mb-3 align-items-center justfy-content-center">
        <img src={icon} alt="" />
      </div>
      <div className="d-flex flex-column align-items-center justify-content-end pb-5">
        <div className="d-flex flex-column align-items-center">
          {editMode ? (
            <TextField
              className="mb-1"
              size="small"
              type="text"
              value={newTitle}
              placeholder={title}
              onChange={(event) => {
                setNewTitle(event.target.value);
              }}
            />
          ) : (
            <Typography className="mb-1" variant="body1" fontWeight="bold">
              {title}
            </Typography>
          )}
          {editMode ? (
            <TextField
              value={newDescription}
              size="small"
              type="text"
              placeholder={description}
              onChange={(event) => {
                setNewDescription(event.target.value);
              }}
            />
          ) : (
            <Typography variant="body2" textAlign="center">
              {description}
            </Typography>
          )}
        </div>
        <div id={`reward-card-points-${id}`} className="d-flex points-container align-items-center gap-1 mt-2">
          <img src={kodcoinIcon} alt="" />
          <Typography variant="h6" fontWeight="bold">
            {requiredPoints}
          </Typography>
        </div>
      </div>
    </CustomCard>
  );
};

export default RewardCard;

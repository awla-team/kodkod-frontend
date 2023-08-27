import { useState } from 'react';
import { Typography, TextField } from '@mui/material';
import { IRewardCardProps } from './interfaces';
import {
  EditRewardActionsContainer,
  EditRewardButton,
  RewardCardContainer,
  RewardCardContent,
  RewardCardHeader,
  RewardDescriptionInput,
  RewardImg,
} from './styled';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import RewardPoints from './RewardPoints';
import { AxiosError, AxiosResponse } from 'axios';
import UsedRewardCount from './UsedRewardCount';

const RewardCard = ({
  edit,
  rewardId,
  title,
  icon,
  description,
  requiredPoints,
  order,
  usedCount,
}: IRewardCardProps) => {
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
      .then((response: AxiosResponse) => {
        if (response?.data?.responseData === 1) setEditMode(false);
      })
      .catch((error: AxiosError) => {
        console.error(error);
      });
  };

  return (
    <RewardCardContainer variant="outlined">
      <EditRewardActionsContainer>
        {editMode && (
          <>
            <EditRewardButton
              color="inherit"
              variant="contained"
              onClick={editReward}
              startIcon={<CheckIcon />}
            >
              Guardar
            </EditRewardButton>
            <EditRewardButton
              color="inherit"
              variant="contained"
              onClick={cancelEditMode}
              startIcon={<CloseIcon />}
            >
              Cancelar
            </EditRewardButton>
          </>
        )}
        {!editMode && !!rewardId && (
          <EditRewardButton
            color="inherit"
            variant="contained"
            onClick={activateEditMode}
            startIcon={<EditIcon />}
          >
            Editar
          </EditRewardButton>
        )}
      </EditRewardActionsContainer>
      <RewardCardHeader>
        <UsedRewardCount count={usedCount} />
        {!!order && (
          <Typography
            color="white"
            variant="body1"
            fontWeight="bold"
            fontSize="32px"
          >
            {order}
          </Typography>
        )}
      </RewardCardHeader>
      <RewardCardContent>
        <RewardImg src={icon} alt="" />
        <div className="d-flex flex-column align-items-center justify-content-end">
          <div className="d-flex flex-column align-items-center">
            {editMode ? (
              <TextField
                className="mb-1"
                size="small"
                type="text"
                value={newTitle}
                placeholder={title}
                color="primary"
                sx={{
                  input: { padding: '4px' },
                }}
                onChange={(event) => {
                  setNewTitle(event.target.value);
                }}
              />
            ) : (
              <Typography
                className="mb-1"
                variant="body1"
                fontWeight="bold"
                fontSize="20px"
                sx={{
                  marginBottom: '8px',
                }}
              >
                {title}
              </Typography>
            )}
            {editMode ? (
              <RewardDescriptionInput
                minRows={2}
                maxRows={4}
                value={newDescription}
                placeholder={description}
                onChange={(event) => {
                  setNewDescription(event.target.value);
                }}
              />
            ) : (
              <Typography
                variant="body2"
                textAlign="center"
                fontSize="16px"
                sx={{
                  padding: '8px',
                }}
              >
                {description}
              </Typography>
            )}
          </div>
          <RewardPoints points={requiredPoints as number} />
        </div>
      </RewardCardContent>
    </RewardCardContainer>
  );
};

export default RewardCard;

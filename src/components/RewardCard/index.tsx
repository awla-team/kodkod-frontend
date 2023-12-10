import { useState } from 'react';
import { Typography, TextField } from '@mui/material';
import { type IRewardCardProps } from './interfaces';
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
import RedeemRewardDrawer from './RedeemRewardDrawer';
import Toaster from 'utils/Toster';

const RewardCard: React.FC<IRewardCardProps> = ({
  id,
  onSave,
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
  const [openDrawer, setOpenDrawer] = useState(false);

  const cancelEditMode = () => {
    setNewTitle(title);
    setNewDescription(description);
    setEditMode(false);
  };

  const activateEditMode = () => {
    setEditMode(true);
  };

  const onCloseDrawer = () => setOpenDrawer(false);

  return (
    <>
      <RewardCardContainer variant='outlined'>
        <EditRewardActionsContainer>
          {editMode && (
            <>
              <EditRewardButton
                color='inherit'
                variant='contained'
                onClick={() => {
                  onSave(rewardId, {
                    title: newTitle,
                    description: newDescription,
                  })
                    .then(() => {
                      setEditMode(false);
                    })
                    .catch((e) => {
                      console.log(e);
                      Toaster('error', 'Ha ocurrido un error');
                    });
                }}
                startIcon={<CheckIcon />}
              >
                Guardar
              </EditRewardButton>
              <EditRewardButton
                color='inherit'
                variant='contained'
                onClick={cancelEditMode}
                startIcon={<CloseIcon />}
              >
                Cancelar
              </EditRewardButton>
            </>
          )}
          {!editMode && !!rewardId && (
            <EditRewardButton
              id={`reward-card-edit-${id}`}
              color='inherit'
              variant='contained'
              onClick={activateEditMode}
              startIcon={<EditIcon />}
            >
              Editar
            </EditRewardButton>
          )}
        </EditRewardActionsContainer>
        <div
          id={`reward-card-${id}`}
          className={`d-flex flex-column flex-fill ${
            editMode ? 'no-hover' : ''
          }`}
          onClick={() => {
            if (!editMode) setOpenDrawer(true);
          }}
        >
          <RewardCardHeader>
            <div id={`reward-card-indicator-${id}`}>
              <UsedRewardCount count={usedCount} />
            </div>
            {!!order && (
              <Typography
                color='white'
                variant='body1'
                fontWeight='bold'
                fontSize='32px'
              >
                {order}
              </Typography>
            )}
          </RewardCardHeader>
          <RewardCardContent>
            <RewardImg src={icon} alt='' />
            <div className='d-flex flex-column align-items-center justify-content-end'>
              <div className='d-flex flex-column align-items-center'>
                {editMode ? (
                  <TextField
                    className='mb-1'
                    size='small'
                    type='text'
                    value={newTitle}
                    placeholder={title}
                    color='primary'
                    sx={{
                      input: { padding: '4px' },
                    }}
                    onChange={(event) => {
                      setNewTitle(event.target.value);
                    }}
                  />
                ) : (
                  <Typography
                    className='mb-1'
                    variant='body1'
                    fontWeight='bold'
                    fontSize='20px'
                    textAlign='center'
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
                    variant='body2'
                    textAlign='center'
                    fontSize='16px'
                    sx={{
                      padding: '8px',
                    }}
                  >
                    {description}
                  </Typography>
                )}
              </div>
              <RewardPoints
                id={`reward-card-points-${id}`}
                points={requiredPoints as number}
              />
            </div>
          </RewardCardContent>
        </div>
      </RewardCardContainer>
      <RedeemRewardDrawer
        openDrawer={openDrawer}
        onCloseDrawer={onCloseDrawer}
        rewardId={rewardId}
        icon={icon}
        title={title}
        description={description}
        order={order}
      />
    </>
  );
};

export default RewardCard;

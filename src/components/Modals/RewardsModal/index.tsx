import type { FC, SyntheticEvent } from 'react';
import {
  Button,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  Tooltip,
  Checkbox,
} from '@mui/material';
import { RewardIcon, RewardsList } from './styled';
import { useEffect, useState } from 'react';
import { IUser, IUserHasReward } from 'global/interfaces';
import Moment from 'moment';
import { studentUseRewards } from 'services/rewards';
import Toaster from 'utils/Toster';

const RewardsModal: FC<{
  open: boolean;
  student: IUser;
  onClose: () => void;
  onSave: (studentId: number, selectedRewards: number[]) => void;
}> = ({ open, student, onClose, onSave }) => {
  const [activeRewards, setActiveRewards] = useState<IUserHasReward[]>([]);
  const [inactiveRewards, setInactiveRewards] = useState<IUserHasReward[]>([]);
  const [selectedRewards, setSelectedRewards] = useState<number[]>([]);

  useEffect(() => {
    setActiveRewards(
      student?.user_has_rewards?.filter(
        (user_has_reward) => !user_has_reward.used_at
      ) || []
    );
    setInactiveRewards(
      student?.user_has_rewards?.filter(
        (user_has_reward) => user_has_reward.used_at
      ) || []
    );
  }, [student]);

  const handleCheckboxChange = (rewardId: number, value: boolean) => {
    if (value) setSelectedRewards([...selectedRewards, rewardId]);
    else
      setSelectedRewards(
        [...selectedRewards].filter((reward) => reward !== rewardId)
      );
  };

  useEffect(() => {
    if (open) setSelectedRewards([]);
  }, [open]);

  return (
    <Dialog open={open} PaperProps={{ className: 'p-3' }} fullWidth>
      <DialogTitle fontWeight="bold">Activar recompensas</DialogTitle>
      <DialogContent dividers className="py-4">
        <div className="mb-2">
          <Typography
            component="span"
            variant="body1"
          >{`Selecciona las recompensas que quieres activar para `}</Typography>
          <Typography
            component="span"
            variant="body1"
            fontWeight="bold"
            className="mb-5"
          >{`${student?.first_name} ${student?.last_name}`}</Typography>
        </div>
        <div className="mb-2">
          <RewardsList className="d-flex mt-2 w-100">
            {activeRewards.length ? (
              activeRewards.map((user_has_reward) => (
                <Tooltip
                  key={`reward-${user_has_reward.id}`}
                  arrow
                  title={
                    <div className="d-flex flex-column">
                      <Typography fontWeight="bold" variant="body2">
                        {user_has_reward.reward.title}
                      </Typography>
                      <Typography variant="body2" className="mb-2">
                        {user_has_reward.reward.description}
                      </Typography>
                      <Typography variant="caption">{`Obtenida el ${Moment.utc(
                        user_has_reward.created_at
                      )
                        .local()
                        .format('DD/MM/YYYY')}`}</Typography>
                    </div>
                  }
                >
                  <div>
                    <Checkbox
                      onChange={(event, value) =>
                        handleCheckboxChange(user_has_reward.reward.id, value)
                      }
                      icon={
                        <RewardIcon className="reward-icon">
                          <img src={user_has_reward.reward.icon} />
                        </RewardIcon>
                      }
                      checkedIcon={
                        <RewardIcon className="reward-icon selected">
                          <img src={user_has_reward.reward.icon} />
                        </RewardIcon>
                      }
                    />
                  </div>
                </Tooltip>
              ))
            ) : (
              <div className="p-4 d-flex justify-content-center align-items-center w-100">
                <Typography
                  component="span"
                  variant="caption"
                  textAlign="center"
                >
                  Este estudiante no tiene recompensas por activar
                </Typography>
              </div>
            )}
          </RewardsList>
        </div>

        {inactiveRewards.length ? (
          <div>
            <Typography component="span" variant="subtitle1" fontWeight="bold">
              Recompensas inactivas
            </Typography>
            <RewardsList className="d-flex mt-2 inactive-rewards">
              {inactiveRewards.map((user_has_reward) => (
                <Tooltip
                  key={`reward-${user_has_reward.id}`}
                  arrow
                  title={
                    <div className="d-flex flex-column">
                      <Typography fontWeight="bold" variant="body2">
                        {user_has_reward.reward.title}
                      </Typography>
                      <Typography variant="body2" className="mb-2">
                        {user_has_reward.reward.description}
                      </Typography>
                      <Typography variant="caption">{`Obtenida el ${Moment.utc(
                        user_has_reward.created_at
                      )
                        .local()
                        .format('DD/MM/YYYY')}`}</Typography>
                      <Typography variant="caption">{`Utilizada el ${Moment.utc(
                        user_has_reward.used_at
                      )
                        .local()
                        .format('DD/MM/YYYY')}`}</Typography>
                    </div>
                  }
                >
                  <div>
                    <Checkbox
                      className="disabled"
                      icon={
                        <RewardIcon className="reward-icon">
                          <img src={user_has_reward.reward.icon} />
                        </RewardIcon>
                      }
                      checkedIcon={
                        <RewardIcon className="reward-icon">
                          <img src={user_has_reward.reward.icon} />
                        </RewardIcon>
                      }
                    />
                  </div>
                </Tooltip>
              ))}
            </RewardsList>
          </div>
        ) : null}
      </DialogContent>
      <DialogActions className="pt-3">
        <Button variant="outlined" onClick={() => onClose()}>
          Cancelar
        </Button>
        <Button
          variant="contained"
          onClick={() => onSave(student.id, selectedRewards)}
          disabled={!selectedRewards.length}
        >
          Activar seleccionadas
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RewardsModal;

import type { FC, SyntheticEvent } from "react";
import {
  Button,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  Tooltip,
  Checkbox,
} from "@mui/material";
import { RewardIcon, RewardsList } from "./styled";
import { useEffect, useState } from "react";
import { IReward, IUser } from "global/interfaces";
import Moment from 'moment';

const RewardsModal: FC<{ open: boolean, student: IUser, onClose: () => void }> = ({
  open,
  student,
  onClose
}) => {
  const [activeRewards, setActiveRewards] = useState<IReward[]>([]);
  const [inactiveRewards, setInactiveRewards] = useState<IReward[]>([]);
  const [selectedRewards, setSelectedRewards] = useState<number[]>([]);

  useEffect(() => {
    if (student?.rewards?.length) {
      setActiveRewards(student?.rewards?.filter((reward) => !reward.user_has_reward?.used_at));
      setInactiveRewards(student?.rewards?.filter((reward) => !!reward.user_has_reward?.used_at));
    }
  }, [student]);

  const handleCheckboxChange = (rewardId: number, value: boolean) => {
    if (value) setSelectedRewards([...selectedRewards, rewardId]);
    else setSelectedRewards([...selectedRewards].filter((reward) => reward !== rewardId));    
  };  

  return (
    <Dialog open={open} PaperProps={{ className: "p-3" }} fullWidth>
      <DialogTitle fontWeight="bold">Activar recompensas</DialogTitle>
        <DialogContent dividers className="py-4">
          <div className="mb-2">
            <Typography component="span" variant="body1">{`Selecciona las recompensas que quieres activar para `}</Typography>
            <Typography component="span" variant="body1" fontWeight="bold" className="mb-5">{`${student?.first_name} ${student?.last_name}`}</Typography>
          </div>
          <div className="mb-4">
            <RewardsList className="d-flex mt-2">
              {activeRewards.map((reward) => (
                <Tooltip arrow title={
                  <div className="d-flex flex-column">
                    <Typography fontWeight="bold" variant="body2">{reward.title}</Typography>
                    <Typography variant="body2" className="mb-2">{reward.description}</Typography>
                    <Typography variant="caption">{`Obtenida el ${Moment.utc(reward.user_has_reward.created_at).local().format('DD/MM/YYYY')}`}</Typography>
                  </div>}
                >
                  <Checkbox onChange={(event, value) => handleCheckboxChange(reward.id, value)} key={`reward-${reward.id}`} icon={<RewardIcon />} checkedIcon={<RewardIcon className="selected" />}  />
                </Tooltip>
              ))}
            </RewardsList>
          </div>

          {inactiveRewards.length ? (
            <div>
              <Typography component="span" variant="subtitle1" fontWeight="bold">Recompensas inactivas</Typography>
              <RewardsList className="d-flex mt-2 inactive-rewards">
                {inactiveRewards.map((reward) => (
                  <Tooltip arrow title={
                    <div className="d-flex flex-column">
                      <Typography fontWeight="bold" variant="body2">{reward.title}</Typography>
                      <Typography variant="body2" className="mb-2">{reward.description}</Typography>
                      <Typography variant="caption">{`Utilizada el ${Moment.utc(reward.user_has_reward.used_at).local().format('DD/MM/YYYY')}`}</Typography>
                    </div>}
                  >
                    <Checkbox disabled key={`reward-${reward.id}`} icon={<RewardIcon />} checkedIcon={<RewardIcon />}  />
                  </Tooltip>
                ))}
              </RewardsList>
            </div>
          ) : null}
        </DialogContent>
        <DialogActions className="pt-3">
          <Button variant="outlined" onClick={() => onClose()}>Cancelar</Button>
          <Button variant="contained" disabled={!selectedRewards.length}>Activar seleccionadas</Button>
        </DialogActions>
    </Dialog>
  );
};

export default RewardsModal;

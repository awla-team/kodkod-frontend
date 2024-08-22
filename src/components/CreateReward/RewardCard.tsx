import { type HTMLAttributes, type FC } from 'react';
import { type CreateReward } from 'types/validations/reward';
import EditNoteIcon from '@mui/icons-material/EditNote';

interface Props extends HTMLAttributes<HTMLDivElement> {
  reward: CreateReward;
  editable?: boolean;
}

const RewardCard: FC<Props> = ({ reward, editable, onClick }) => {
  return (
    <div
      onClick={onClick}
      className='tw-flex tw-justify-center tw-items-center tw-flex-col tw-rounded-md'
    >
      <div className='tw-h-12 tw-bg-fuchsia-800 tw-w-full tw-rounded-t-md' />

      <div className='tw-flex tw-w-full tw-py-4 tw-flex-col tw-grow tw-items-center tw-bg-gradient-to-r tw-from-purple-100 tw-to-cyan-100 tw-px-4 tw-justify-center tw-rounded-b-md'>
        <h4 className='tw-font-bold tw-text-xl'>{reward.name}</h4>
        <p>{reward.description}</p>
        <div hidden={!editable}>
          <EditNoteIcon className='' />
        </div>
      </div>
    </div>
  );
};
export default RewardCard;

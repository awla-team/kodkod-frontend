import { type FC } from 'react';
import { type CreateRewardForm } from 'types/validations/reward';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditNoteIcon from '@mui/icons-material/EditNote';
import postCard from 'assets/images/post-card.png';
import favStar from 'assets/images/fav-star.png';
import type IReward from 'types/models/Reward';

interface Props {
  newReward?: CreateRewardForm & { numberOfActivities: number };
  reward?: IReward;
  editEffect?: () => void;
  deleteEffect?: () => void;
}

const RewardCard: FC<Props> = ({
  newReward,
  reward,
  editEffect,
  deleteEffect,
}) => {
  return (
    <div className='tw-flex tw-justify-center tw-items-center tw-flex-col tw-rounded-md tw-min-w-72 tw-max-w-72'>
      <div className='tw-flex tw-justify-center tw-text-white tw-items-center tw-h-12 tw-bg-fuchsia-800 tw-w-full tw-rounded-t-md'>
        {editEffect && (
          <div
            onClick={editEffect}
            className='tw-flex tw-mr-3 hover:tw-cursor-pointer tw-ease-in-out hover:tw-bg-indigo-300 hover:tw-border tw-rounded tw-transition-all tw-duration-200'
          >
            <EditNoteIcon className='' />
            Editar
          </div>
        )}
        {deleteEffect && (
          <div
            onClick={deleteEffect}
            className='tw-flex hover:tw-cursor-pointer tw-ease-in-out hover:tw-bg-indigo-300 hover:tw-border tw-rounded tw-transition-all tw-duration-200'
          >
            <DeleteForeverOutlinedIcon className='' />
            Eliminar
          </div>
        )}
      </div>
      <div className='tw-flex tw-min-h-[54vh] tw-w-full tw-py-4 tw-flex-col tw-grow tw-items-center tw-bg-gradient-to-br tw-from-purple-100 tw-to-cyan-100 tw-px-4 tw-justify-center tw-rounded-b-md'>
        <img
          src={favStar}
          alt='book'
          className='tw-w-20 tw-object-cover tw-my-8'
        />
        <h3 className='tw-text tw-text-center tw-break-all tw-font-bold tw-text-gray-700'>
          {reward?.title || newReward?.name}
        </h3>
        <h5 className='tw-mb-8 tw-text-center'>
          {reward?.description || newReward?.description}
        </h5>
        <div className='tw-text-fuchsia-800 tw-font-semibold'>
          Se obtiene completando
        </div>
        <h2 className='tw-text-fuchsia-800 tw-font-semibold tw-mb-8'>
          {reward?.n_required || newReward?.numberOfActivities}
          <img
            src={postCard}
            alt='book'
            className='tw-w-10 tw-object-cover tw-ml-2'
          />
        </h2>
      </div>
    </div>
  );
};
export default RewardCard;

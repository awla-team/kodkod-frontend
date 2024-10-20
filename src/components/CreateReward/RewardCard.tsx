import { type HTMLAttributes, type FC } from 'react';
import { type CreateRewardForm } from 'types/validations/reward';
import starIcon from 'assets/images/star.png';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import rewardIcon from 'assets/images/reward2.png';
import EditNoteIcon from '@mui/icons-material/EditNote';

interface Props extends HTMLAttributes<HTMLDivElement> {
  reward: CreateRewardForm & { numberOfActivities: number };
  editEffect: () => void;
  deleteEffect?: () => void;
}

const RewardCard: FC<Props> = ({ reward, editEffect, deleteEffect }) => {
  return (
    <div className='tw-flex tw-justify-center tw-items-center tw-flex-col tw-rounded-md tw-min-w-72 tw-max-w-72'>
      <div className='tw-flex tw-justify-center tw-text-white tw-items-center tw-h-12 tw-bg-fuchsia-800 tw-w-full tw-rounded-t-md'>
        <div
          onClick={editEffect}
          className='tw-flex tw-mr-3 hover:tw-cursor-pointer tw-ease-in-out hover:tw-bg-indigo-300 hover:tw-border tw-rounded tw-transition-all tw-duration-200'
        >
          <EditNoteIcon className='' />
          Editar
        </div>
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

      <div className='tw-flex tw-w-full tw-mx-8 tw-h-96 tw-py-4 tw-flex-col tw-grow tw-items-center tw-bg-gradient-to-r tw-from-purple-100 tw-to-cyan-100 tw-px-4 tw-justify-center tw-rounded-b-md'>
        <img
          src={starIcon}
          alt='star'
          className='tw-w-16 tw-h-16 tw-object-cover tw-mb-4'
        />
        <h3 className='tw-text tw-text-center tw-break-all tw-font-bold tw-text-gray-900'>
          {reward.name}
        </h3>
        <h5 className='tw-text tw-text-center tw-scroll-auto tw-overflow-y-auto tw-hyphens-auto'>
          {reward.description}
        </h5>
        <span className='tw-text-fuchsia-800 tw-text-center tw-font-medium'>
          Se obtiene completando
        </span>
        <div className='tw-flex tw-items-center tw-gap-2 mt-1'>
          <p className='tw-text-4xl tw-font-semibold tw-text-fuchsia-800 '>
            {reward.numberOfActivities}
          </p>
          <img
            src={rewardIcon}
            alt='reward'
            className='tw-w-10 tw-h-10 tw-object-cover tw-mb-4'
          />
        </div>
      </div>
    </div>
  );
};
export default RewardCard;

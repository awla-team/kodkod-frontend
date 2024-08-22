import { type CreateRewardForm } from 'types/validations/reward';
import starIcon from 'assets/images/star.png';
import rewardIcon from 'assets/images/reward2.png';

interface Props {
  reward: CreateRewardForm & { numberOfActivities: number };
}

export default function RewardCard({ reward }: Props) {
  return (
    <div className='tw-flex tw-justify-center tw-items-center tw-flex-col tw-rounded-md'>
      <div className='tw-h-12 tw-bg-fuchsia-800 tw-w-full tw-rounded-t-md' />

      <div className='tw-flex tw-w-full tw-py-4 tw-flex-col tw-grow tw-items-center tw-bg-gradient-to-r tw-from-purple-100 tw-to-cyan-100 tw-px-4 tw-justify-center tw-rounded-b-md'>
        <img
          src={starIcon}
          alt='star'
          className='tw-w-16 tw-h-16 tw-object-cover tw-mb-4'
        />
        <p className='tw-text-xl tw-font-semibold tw-text-center'>
          {reward.description}
        </p>
        <span className='tw-text-fuchsia-800 tw-font-medium'>
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
}

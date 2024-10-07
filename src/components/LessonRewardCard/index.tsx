import type IReward from 'types/models/Reward';

import postCard from 'assets/images/post-card.png';
import favStar from 'assets/images/fav-star.png';

interface Props {
  reward: IReward;
}

export default function RewardCard({ reward }: Props) {
  return (
    <div className='tw-flex tw-justify-center tw-items-center tw-flex-col tw-rounded-md tw-w-full'>
      <div className='tw-h-12 tw-bg-fuchsia-800 tw-w-full tw-rounded-t-md' />

      <div className='tw-flex tw-w-full tw-py-4 tw-flex-col tw-grow tw-items-center tw-bg-gradient-to-br tw-from-purple-100 tw-to-cyan-100 tw-px-4 tw-justify-center tw-rounded-b-md'>
        <img
          src={favStar}
          alt='book'
          className='tw-w-20 tw-object-cover tw-my-8'
        />
        <h3 className='tw-text tw-text-center tw-break-all tw-font-bold tw-text-gray-700'>
          {reward.title}
        </h3>
        <h5 className='tw-mb-8'>{reward.description}</h5>
        <div className='tw-text-fuchsia-800 tw-font-semibold'>
          {'Se obtiene completando'}
        </div>
        <h2 className='tw-text-fuchsia-800 tw-font-semibold tw-mb-8'>
          {reward.n_required}{' '}
          <img src={postCard} alt='book' className='tw-w-10 tw-object-cover' />
        </h2>
      </div>
    </div>
  );
}

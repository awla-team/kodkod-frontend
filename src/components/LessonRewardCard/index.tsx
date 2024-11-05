import type IReward from 'types/models/Reward';
import starIcon from 'assets/images/star.png';

interface Props {
  reward: IReward;
}

const RewardCard = ({ reward }: Props) => {
  return (
    <div className='tw-flex tw-justify-center tw-items-center tw-flex-col tw-rounded-md tw-min-w-[260px] tw-w-[260px] tw-max-w-[260px] tw-min-h-[400px] tw-h-[400px]'>
      <div className='tw-flex tw-justify-center tw-items-center tw-bg-fuchsia-800 tw-w-full tw-rounded-t-md tw-p-6 tw-gap-2' />
      <div className='tw-flex tw-w-full tw-flex-col tw-grow tw-items-center tw-bg-gradient-to-r tw-from-purple-100 tw-to-cyan-100 tw-px-4 tw-py-8 tw-justify-between tw-rounded-b-md'>
        <div className='tw-flex tw-flex-col tw-items-center tw-justify-center'>
          <img
            src={starIcon}
            alt='star'
            className='tw-w-12 tw-h-12 tw-object-cover tw-mb-4'
          />
          <h4 className='tw-text tw-text-center tw-break-all tw-font-bold tw-text-gray-900'>
            {reward.title}
          </h4>
          <h5 className='tw-text tw-text-center tw-scroll-auto tw-overflow-y-auto tw-hyphens-auto'>
            {reward.description}
          </h5>
        </div>
        <div className='tw-flex tw-flex-col tw-items-center tw-justify-center'>
          <span className='tw-text-fuchsia-800 tw-text-center tw-font-medium'>
            Se obtiene completando
          </span>
          <div className='tw-flex tw-items-baseline tw-justify-center tw-gap-2 tw-text-fuchsia-800'>
            <span className='tw-text-4xl tw-font-semibold tw-text-fuchsia-800'>
              {reward.n_required}
            </span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              fill='currentColor'
              className='bi bi-postcard-heart'
              viewBox='0 0 16 16'
            >
              <path d='M8 4.5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0zm3.5.878c1.482-1.42 4.795 1.392 0 4.622-4.795-3.23-1.482-6.043 0-4.622M2.5 5a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1z' />
              <path
                fillRule='evenodd'
                d='M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1z'
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardCard;

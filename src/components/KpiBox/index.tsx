import { Tooltip } from '@mui/material';
import { type ReactNode, type FC } from 'react';
import HelpIcon from '@mui/icons-material/Help';

interface Props {
  icon: ReactNode;
  title: string;
  value: string;
  helperText: string | null;
}

const KpiBox: FC<Props> = ({ icon, helperText, title, value }) => {
  return (
    <div className='tw-flex tw-justify-between tw-w-full tw-h-[100px] tw-border-solid tw-rounded-lg tw-border-2 tw-border-zinc-300'>
      <div className='tw-flex tw-p-[24px] tw-gap-[24px]'>
        <div className='tw-flex tw-justify-center tw-items-center'>{icon}</div>
        <div className='tw-flex tw-flex-col tw-w-full'>
          <span className='tw-font-bold'>{value}</span>
          <span>{title}</span>
        </div>
        </div>
      </div>
      <div className='tw-flex tw-m-2'>
        {helperText != null && (
          <Tooltip className='' title={helperText}>
            <HelpIcon
              fontSize='small'
              className='tw-text-gray-500 tw-ml-3 tw-mt-1 hover:tw-cursor-pointer'
            />
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default KpiBox;

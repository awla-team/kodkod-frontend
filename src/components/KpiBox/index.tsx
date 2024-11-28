import { Tooltip } from '@mui/material';
import { type ReactNode, type FC } from 'react';
import HelpIcon from '@mui/icons-material/Help';

interface Props {
  icon: ReactNode;
  title: string;
  value: string;
  helperText?: string | null;
}

const KpiBox: FC<Props> = ({ icon, helperText, title, value }) => {
  return (
    <div className='tw-flex tw-justify-between tw-items-center tw-w-full tw-min-h-[100px] tw-border-solid tw-rounded-lg tw-border-2 tw-border-zinc-300 tw-relative'>
      <div className='tw-flex tw-p-[24px] tw-gap-[24px] tw-w-full tw-items-center'>
        <div className='tw-flex tw-justify-center tw-items-center'>{icon}</div>
        <div className='tw-flex tw-flex-col tw-w-full'>
          <span className='tw-font-bold'>{value}</span>
          <span>{title}</span>
        </div>
      </div>
      {!!helperText && (
        <Tooltip className='tw-absolute tw-top-4 tw-right-4' title={helperText}>
          <HelpIcon
            fontSize='small'
            className='tw-text-gray-500 hover:tw-cursor-pointer'
          />
        </Tooltip>
      )}
    </div>
  );
};

export default KpiBox;

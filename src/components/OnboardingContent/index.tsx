import { Typography } from '@mui/material';
import React from 'react';

const OnboardingContent: React.FC<{
  title?: string;
  children?: React.ReactElement;
  img?: string;
}> = ({ title, children, img }) => {
  return (
    <div className='d-flex flex-column'>
      {title ? (
        <div className='onboarding-title mb-3'>
          <Typography variant='h6' fontWeight='bold'>
            {title}
          </Typography>
        </div>
      ) : null}
      {img ? <div className='onboarding-img mb-3'>{img}</div> : null}
      <div className='onboarding-content'>{children}</div>
    </div>
  );
};

export default OnboardingContent;

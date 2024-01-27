import { FC } from 'react';
import * as Styled from './styled';

const StageRequirements: FC = () => {
  return (
    <Styled.StageRequirementsContainer>
      <h3 className={'header__title'}>
        Requirements for the class to move to the next stage
      </h3>

      <div className={'stage__progress__container'}>
        <div className={'stage__requirement'}>
          <div className={'stage__requirement__name'}>
            <span>Collaborative missions accomplished</span>
            <span>0/9</span>
          </div>
          <div className={'stage__requirement__progress'}>
            <Styled.LinearProgress
              variant='determinate'
              value={(0 / 9) * 100}
            />
          </div>
        </div>

        <div className={'stage__requirement'}>
          <div className={'stage__requirement__name'}>
            <span>Collaborative missions accomplished</span>
            <span>0/9</span>
          </div>
          <div className={'stage__requirement__progress'}>
            <Styled.LinearProgress
              variant='determinate'
              value={(4 / 9) * 100}
            />
          </div>
        </div>

        <div className={'stage__requirement'}>
          <div className={'stage__requirement__name'}>
            <span>Collaborative missions accomplished</span>
            <span>20/20</span>
          </div>
          <div className={'stage__requirement__progress'}>
            <Styled.LinearProgress
              variant='determinate'
              value={(20 / 20) * 100}
            />
          </div>
        </div>
      </div>
    </Styled.StageRequirementsContainer>
  );
};

export default StageRequirements;

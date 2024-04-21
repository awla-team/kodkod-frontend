import { type IStageIconProps } from './interfaces';
import { StageIconContainer } from './styled';

const StageIcon = ({ icon, selected = false }: IStageIconProps) => (
  <StageIconContainer selected={selected} className='stage-icon-container'>
    <img src={icon} />
  </StageIconContainer>
);

export default StageIcon;

import { IStageIconProps } from './interfaces';
import { StageIconContainer } from './styled';

const StageIcon = ({ icon, selected = false }: IStageIconProps) => (
    <StageIconContainer selected={selected}>
        <img src={icon} />
    </StageIconContainer>
)

export default StageIcon;
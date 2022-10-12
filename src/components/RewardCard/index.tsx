import { Typography, Card } from '@mui/material';
import { RewardCardContainer, PointsContainer } from './styled';
import kodcoinIcon from './../../assets/images/kodcoin.png';
import { IRewardCardProps } from './interfaces';

const RewardCard: React.FC<IRewardCardProps> = ({ title, icon, description, requiredPoints, type }) => (
    <RewardCardContainer className="d-flex flex-column align-items-center" type={type}>
        <Card variant="outlined" className="p-3 mb-3" sx={{ height: '280px' }}>
            <Typography className="mb-3" variant="h6" fontWeight="bold">{title}</Typography>
            <img className="mb-3" src={icon} />
            <Typography>{description}</Typography>
        </Card>
        <PointsContainer className="points-container">
            <Typography fontWeight="bold">{requiredPoints}</Typography>
            <img src={kodcoinIcon} />
        </PointsContainer>              
    </RewardCardContainer>
);

export default RewardCard;
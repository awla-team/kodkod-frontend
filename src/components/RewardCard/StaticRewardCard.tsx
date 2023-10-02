import {
  RewardCardContainer,
  RewardCardContent,
  RewardCardHeader,
  RewardImg,
} from './styled';
import { Typography } from '@mui/material';

const StaticRewardCard = ({
  order,
  icon,
  title,
  description,
}: {
  order?: number;
  icon: string;
  title: string;
  description: string;
}) => {
  return (
    <RewardCardContainer className="reward-card static" variant="outlined">
      <RewardCardHeader>
        <div></div>
        {!!order && (
          <Typography
            color="white"
            variant="body1"
            fontWeight="bold"
            fontSize="20px"
          >
            {order}
          </Typography>
        )}
      </RewardCardHeader>
      <RewardCardContent>
        <RewardImg src={icon} alt="" />
        <div className="d-flex flex-column">
          <div className="d-flex flex-column">
            <Typography
              className="mb-1"
              variant="body1"
              fontWeight="bold"
              fontSize="16px"
              sx={{
                marginBottom: '8px',
              }}
            >
              {title}
            </Typography>
            <Typography variant="body2" fontSize="14px">
              {description}
            </Typography>
          </div>
        </div>
      </RewardCardContent>
    </RewardCardContainer>
  );
};

export default StaticRewardCard;

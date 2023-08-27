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
    <RewardCardContainer className="static" variant="elevation">
      <RewardCardHeader>
        <div></div>
        {!!order && (
          <Typography
            color="white"
            variant="body1"
            fontWeight="bold"
            fontSize="32px"
          >
            {order}
          </Typography>
        )}
      </RewardCardHeader>
      <RewardCardContent>
        <RewardImg src={icon} alt="" />
        <div className="d-flex flex-column align-items-center justify-content-end">
          <div className="d-flex flex-column align-items-center">
            <Typography
              className="mb-1"
              variant="body1"
              fontWeight="bold"
              fontSize="20px"
              textAlign="center"
              sx={{
                marginBottom: '8px',
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              textAlign="center"
              fontSize="16px"
              sx={{
                padding: '8px',
              }}
            >
              {description}
            </Typography>
          </div>
        </div>
      </RewardCardContent>
    </RewardCardContainer>
  );
};

export default StaticRewardCard;

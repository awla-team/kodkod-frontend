import { Typography, Card } from "@mui/material";
import kodcoinIcon from "./../../assets/images/kodcoin.png";
import { IRewardCardProps } from "./interfaces";
import { CustomCard } from "./styled";

const RewardCard: React.FC<IRewardCardProps> = ({
  title,
  icon,
  description,
  requiredPoints,
}) => {
  return (
    <CustomCard variant="outlined" className="d-flex flex-column py-4 px-3 mb-3 align-items-center">
      <div className="reward-img mb-3">
        <img src={icon} />
      </div>
      <div className="d-flex flex-column align-items-center justify-content-between flex-fill">
        <div className="d-flex flex-column align-items-center">
          <Typography className="mb-1" variant="body1" fontWeight="bold">{title}</Typography>
          <Typography variant="body2" textAlign="center">{description}</Typography>
        </div>
        <div className="d-flex points-container align-items-center gap-1 mt-2">
          <img src={kodcoinIcon} />
          <Typography variant="h6" fontWeight="bold">{requiredPoints}</Typography>
        </div>
      </div>
    </CustomCard>
  );
}

export default RewardCard;

import { Typography } from '@mui/material';
import styled from 'styled-components';
import { ReactComponent as GraduationIcon } from 'assets/images/graduation-icon.svg';

const GraduationCountContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const UsedRewardCount = ({ count }: { count: number }) => {
  return (
    <GraduationCountContainer>
      <GraduationIcon />
      <Typography
        color="white"
        variant="body1"
        fontWeight="bold"
        fontSize="16px"
      >
        {count}
      </Typography>
    </GraduationCountContainer>
  );
};

export default UsedRewardCount;

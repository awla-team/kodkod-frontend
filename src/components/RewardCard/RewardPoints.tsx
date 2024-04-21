import styled from 'styled-components';
import kodcoinIcon from './../../assets/images/kodcoin.png';
import { TextField, Typography } from '@mui/material';

const RewardPointsContainer = styled.div`
  position: absolute;
  bottom: -20px;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
  flex-shrink: 0;

  height: 41px;
  min-width: 64px;
  padding: 4px 16px;

  border-radius: 100px;
  background: linear-gradient(180deg, #1c84ff 0%, #fc72ff 99.99%, #fb3aff 100%);
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.25);
`;

const RewardPoints = ({
  id,
  points,
  editMode,
  newPoints,
  onChangeNewPoints,
}: {
  points: number;
  id: string;
  editMode: boolean;
  newPoints: number;
  onChangeNewPoints: (points: number) => void;
}) => (
  <RewardPointsContainer id={id}>
    <img src={kodcoinIcon} alt='' width={20} height={20} />
    {!editMode ? (
      <Typography color='white' variant='h6' fontWeight='bold'>
        {points}
      </Typography>
    ) : (
      <TextField
        className='mb-1'
        size='small'
        type='number'
        value={newPoints}
        placeholder={`${points}`}
        color='info'
        sx={{
          input: { padding: '2px', backgroundColor: 'white', width: '3rem' },
        }}
        onChange={(event) => {
          const value = Number(event.target.value);
          if (value >= 0) {
            onChangeNewPoints(value);
          }
        }}
      />
    )}
  </RewardPointsContainer>
);

export default RewardPoints;

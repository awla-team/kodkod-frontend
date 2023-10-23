import { Box } from '@mui/material';
import styled from 'styled-components';

export const CompletedAdventureContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 8px;

  a:hover {
    color: #fff;
  }
`;

export const CompletedAdventureImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 150px;
`;

export const DataCard = styled.div`
  border: 1px solid #BDBDBD;
  border-radius: 8px;
  padding: 16px;
  img {
    width: 100px; 
    height: 100px;
  }
`;
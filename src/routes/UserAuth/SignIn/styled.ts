import styled from 'styled-components';
import { Box, Card } from '@mui/material';

export const SignInContainer = styled(Box)`
  align-items: center;
  justify-content: center;
`;

export const SignInCard = styled(Card)`
  border-radius: 8px;
  min-width: 160px;
  max-width: 500px;
  width: 100%;
  overflow: auto !important;

  .MuiCardMedia-root {
    background: ${(props) => props.theme.palette.primary.main};
  }
`;

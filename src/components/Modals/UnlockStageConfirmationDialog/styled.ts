import {
  Dialog as MuiDialog,
  DialogContent as MuiDialogContent,
  DialogTitle as MuiDialogTitle,
  DialogActions as MuiDialogActions,
} from '@mui/material';
import styled from 'styled-components';
import { dialogClasses } from '@mui/material/Dialog';

export const Dialog = styled(MuiDialog)`
  & .${dialogClasses.paper} {
    border-radius: 0;
  }
`;

export const DialogTitle = styled(MuiDialogTitle)`
  & .close__icon__container {
    text-align: right;
  }

  & .dialog__header__text {
    text-align: center;
    font-weight: 700;
    font-size: 1.5rem;
  }
`;

export const DialogContent = styled(MuiDialogContent)`
  & .heading__text {
    font-size: 1.25rem;
    font-weight: 700;
  }

  & .confirmation__text {
    margin-block-start: 4rem;
    text-align: center;
  }
`;

export const DialogActions = styled(MuiDialogActions)`
  text-align: center;
  justify-content: center;
  margin-block-end: 1.25rem;
`;

import styled from "styled-components";
import {
  DialogContent,
  DialogTitle,
  Box,
  FormLabel,
  Dialog,
} from "@mui/material";
import { dialogClasses } from "@mui/material/Dialog";
import { buttonClasses } from "@mui/material/Button";

export const DialogBox = styled(Dialog)`
  border-radius: 0px;

  & .${dialogClasses.paper} {
    height: calc(100vh - 64px);
    max-height: 668px;
  }

  @media screen and (max-width: 663.95px) {
    & .${dialogClasses.paper} {
      height: auto;
      max-height: none;
    }
  }
`;
export const DialogBoxContent = styled(DialogContent)`
  display: flex;
  flex-direction: column;
  height: calc(calc(100% - 64px) - 20px);
  

  & .dialog__header__text {
    font-weight: 700;
    font-size: 1.25rem;
  }

  & form {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
`;

export const DialogBoxTitle = styled(DialogTitle)`
  text-align: right;
`;

export const DialogFormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  flex-grow: 1;
`;

export const DialogFormActions = styled(Box)`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 1.5rem;
  flex-grow: 1;

  & .${buttonClasses.contained} {
    border-radius: 8px;
    text-transform: none;
    font-size: 1rem;
  }
`;
export const DialogFormLabel = styled(FormLabel)`
  font-weight: 700;
  font-size: 1rem;
  color: inherit;

  & .helper__text {
    font-size: 0.75rem;
    font-style: italic;
    font-weight: 700;
  }
`;

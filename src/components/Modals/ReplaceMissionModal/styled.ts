import styled from "styled-components";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { dialogClasses } from "@mui/material/Dialog";
import { dialogContentClasses } from "@mui/material/DialogContent";

export const ReplaceMissionModal = styled(Dialog)`
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
export const ReplaceMissionModalContent = styled(DialogContent)`
  padding: 0px 24px;

  & .mission__card__container {
    padding: 0.8rem;
    border: 1px solid #cacaca;
    border-radius: 8px;

    & .mission__detail {
      margin-block-end: 0.5rem;
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }

    & .mission__details_cards {
      overflow: hidden;
      overflow-y: auto;

      & .cards__view {
        height: 378px;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        @media screen and (max-width: 663.95px) {
          & {
            height: auto;
          }
        }
      }
    }
  }
`;

export const ReplaceMissionModalTitle = styled(DialogTitle)`
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 1;

  & .close__icon__container {
    text-align: right;
  }

  & .dialog__header__text {
    font-weight: 700;
    font-size: 1.25rem;
  }
`;

export const ReplaceMissionModalActions = styled(DialogActions)`
  position: sticky;
  padding: 1rem;
  bottom: 0;
  background: #fff;
`;

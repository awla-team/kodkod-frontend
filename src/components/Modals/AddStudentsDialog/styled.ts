import { Dialog, DialogContent, DialogTitle, Box, Button } from "@mui/material";
import styled from "styled-components";
import { dialogClasses } from "@mui/material/Dialog";

export const StudentAddDialog = styled(Dialog)`
  & .${dialogClasses.paper} {
    min-height: 668px;
  }
`;

export const StudentAddDialogContent = styled(DialogContent)`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  min-height: calc(668px - 72px);
`;

export const StudentAddDialogTitle = styled(DialogTitle)`
  text-align: right;
`;

export const StudentsFormDetailsContainer = styled(Box)`
  flex-grow: 1;
  padding-block: 1rem;
  display: flex;
  flex-direction: column;
  & .form__header {
    display: flex;
    align-items: center;
    gap: 1rem;
    & .header__action {
      flex-basis: 10%;
      max-width: 10%;
    }

    & .header__text {
      flex-basis: 45%;
      max-width: 45%;
      font-weight: 700;
      font-size: 1rem;
    }
  }

  & form {
    flex-grow: 1;
    display: flex;
    flex-direction: column;

    & .student__details_container {
      flex-grow: 1;

      & .details__list {
        max-height: 375px;
        overflow: hidden;
        overflow-y: auto;
      }

      & .details__helper__text {
        font-style: italic;
        text-align: right;
      }
    }

    & .action__container {
      text-align: right;
      margin-block-start: 1rem;
    }
  }

  & .student__details {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 1rem;
    & .input_field_group{
      flex-basis: 45%;
      max-width: 45%;
      display: flex;
      gap: 1rem;
      & .input__field {
        flex-basis: 45%;
        max-width: 45%;
      }
    }
    & .input__field {
      flex-basis: 45%;
      max-width: 45%;
    }

    & .delete__action {
      flex-basis: 10%;
      max-width: 10%;
    }
  }
`;

export const ActionButton = styled(Button)`
  font-weight: 700;
  border-radius: 8px;
  text-transform: none;
`;

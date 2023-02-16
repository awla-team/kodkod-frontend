import styled from "styled-components";
import { Box } from "@mui/material";
import { buttonClasses } from "@mui/material/Button";
export const StudentListContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 100%;
  & .header__text {
    font-size: 1.25rem;
    font-weight: 700;
  }
`;

export const StudentListContent = styled(Box).withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) =>
    !["hasDetails"].includes(prop) && defaultValidatorFn(prop),
})<{ hasDetails?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: ${({ hasDetails }) =>
    !hasDetails ? "center" : "flex-start"};
  align-items: ${({ hasDetails }) => (!hasDetails ? "center" : "flex-start")};
  height: 100%;
`;

export const DontHaveDetailsContent = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-grow: 1;
  gap: 1rem;
  & .helper__text {
    color: #4e4e4e;
    font-size: 1.125rem;
    text-align: center;
  }

  & button {
    border-radius: 8px;
    text-transform: none;
  }
`;

export const StudentsListDetailsContainer = styled(Box)`
  margin-block-start: 1rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
  height: 100%;
  justify-content: space-between;

  & .details {
    flex-grow: 1;
    display: flex;
    gap: 1rem;
    flex-direction: column;
    max-height: 792px;
    overflow: hidden;
    overflow-y: auto;
  }

  & .${buttonClasses.contained} {
    border-radius: 8px;
    text-transform: none;
    font-weight: 700;
  }
`;

export const StudentDetailBox = styled(Box)`
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: space-between;

  & .editable_section__form {
    flex-grow: 1;
    & .edit__section {
      display: flex;

      gap: 1rem;
      align-items: center;

      & .editable__field {
        display: flex;
        flex-direction: column;
        font-size: 1rem;
        flex-grow: 1;
      }

      & .editable__action__section {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
    }
  }

  & .student__details__container {
    display: flex;
    flex-grow: 1;
    justify-content: space-between;
    & .student__details {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      font-size: 1rem;

      & .student__email {
        color: #969696;
      }
    }
  }
`;

import styled from "styled-components";
import { Box, Checkbox as MuiCheckbox } from "@mui/material";
import { checkboxClasses } from "@mui/material/Checkbox";

export const StudentListContainer = styled(Box)`
  height: 100%;

  .student-avatar {
    background: ${(props) => props.theme.palette.primary.light};
  }
  & .students__list {
    margin-block: 0.5rem;
    display: flex;
    gap: 1rem;
    flex-direction: column;

    & .scrollable__container {
      height: 100%;
      overflow: hidden;
      overflow-y: auto;

      & .student__detail__container {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        & .student__detail {
          display: flex;
          align-items: center;
          gap: 0.5rem;

          & .student__details__text {
            & .student__name {
            }

            & .student__email {
              color: #969696;
            }
          }
        }
      }
    }
  }

  & .student__selection__count {
    margin-block: 0.5rem;
    text-align: right;
  }
`;

export const Checkbox = styled(MuiCheckbox)`
  &.${checkboxClasses.root} {
    padding: 0;
  }
`;

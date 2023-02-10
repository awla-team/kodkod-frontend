import styled from "styled-components";
import { Box } from "@mui/material";
import { buttonClasses } from "@mui/material/Button";
export const DetailsCardContent = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  & .card__title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    & .card__title__text {
      font-size: 4rem;
      font-weight: 700;
    }

    & .card__title__notification {
      background: url("${"/Vectorbell.svg"}") #ffffff no-repeat center;
      border-radius: 50%;
      width: 44px;
      height: 44px;
      box-shadow: -2px 3px 4px rgba(0, 0, 0, 0.25);
      border: none;
      outline: none;
    }
  }

  & .card__content {
    & p {
      margin: 0;
      font-size: 1rem;
    }
  }

  & .card__action {
    & .${buttonClasses.root} {
      border-radius: 8px;
      text-transform: none;
      font-size: 1.125rem;
      font-weight: 700;
    }
  }
`;

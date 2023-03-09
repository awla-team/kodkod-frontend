import styled from "styled-components";
import {
  Box,
  Card,
  cardContentClasses,
  cardClasses,
  formControlClasses,
  formLabelClasses,
  inputBaseClasses,
  buttonClasses,
  selectClasses,
  outlinedInputClasses,
} from "@mui/material";

export const SignUpContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const SignUpCard = styled(Card)`
  &.${cardClasses.root} {
    width: 100%;
    max-width: 450px;
    background-color: #575757;
  }

  & .${cardContentClasses.root} {
    & .heading__text {
      color: #ffff;
      text-align: center;
      font-size: 2.25rem;
      font-weight: 700;
    }

    & .${formControlClasses.root} {
      & .${formLabelClasses.root}:not(.Mui-error) {
        color: #ffffff;
      }

      & .${inputBaseClasses.root} {
        &:before {
          border-bottom-color: #ffffff;
        }
      }

      & .${selectClasses.outlined} {
        color: #ffffff;

        & ~ svg {
          color: #ffffff;
        }

        & ~ .${outlinedInputClasses.notchedOutline} {
          border-color: #ffffff;
        }
      }
    }

    & .forget__password {
      text-decoration: underline;
    }

    & .action__container {
      & .${buttonClasses.outlined} {
        color: #fff;
        border-color: #ffffff;
        text-transform: none;
        font-weight: 700;
      }

      & .${buttonClasses.contained} {
        color: #fff;
        background: #000000;

        &:disabled {
          cursor: no-drop;
          background: #bdbdbd;
        }

        border-color: #ffffff;
        text-transform: none;
        font-weight: 700;
      }
    }
  }
`;


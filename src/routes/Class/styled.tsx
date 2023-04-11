import styled, { ThemeProps, DefaultTheme } from "styled-components";
import { Box } from "@mui/material";

export const HomeContainer = styled.div`
  font-family: "Arista 2.0";

  img {
    height: 260px;
  }

  h1 {
    font-size: 48px;
    span {
      color: ${(props: ThemeProps<DefaultTheme>) =>
        props.theme.palette.primary.main};
    }
  }
`;

export const NavTabsContainer = styled(Box)`
  display: flex;
  height: 64px;
  width: 100%;
  background: #fff;
  position: fixed;
  border-bottom: 1px solid rgb(33, 33, 33, 0.08);
  justify-content: center;
  align-items: center;
  gap: 24px;

  & > div {
    display: flex;
    flex-direction: column;
    color: rgba(0, 0, 0, 0.6);
    padding: 6px;
    border-radius: 8px;
    transition: all 0.2s ease;

    svg {
      height: 24px;
      width: auto;

      path {
        transition: all 0.2s ease;
        opacity: 1;

        &:first-child {
          stroke-width: 1px;
          stroke: transparent;
          fill: transparent;
        }

        &:last-child {
          fill: rgba(0, 0, 0, 0.6);
        }
      }
    }

    &.disabled {
      cursor: default;
      opacity: 0.4;
      &:hover {
        color: rgba(0, 0, 0, 0.6);
        svg path {
          &:last-child {
            fill: rgba(0, 0, 0, 0.6);
          }
        }
      }
    }

    &:hover {
      color: ${(props) => props.theme.palette.primary.light};
      svg path {
        &:last-child {
          fill: ${(props) => props.theme.palette.primary.light};
        }
      }
    }

    &.active {
      color: ${(props) => props.theme.palette.primary.dark};
      svg path {
        &:first-child {
          fill: ${(props) => props.theme.palette.primary.dark};
          stroke: ${(props) => props.theme.palette.primary.dark};
          stroke-width: 1px;
        }
        &:last-child {
          fill: ${(props) => props.theme.palette.primary.dark};
        }
      }
    }
  }
`;

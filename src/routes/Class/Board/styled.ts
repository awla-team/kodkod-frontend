import styled from "styled-components";
import { Box } from "@mui/material";

export const DashboardContainer = styled(Box)`
  display: grid;
  grid-template-columns: repeat(2, minmax(300px, 50%));
  grid-auto-flow: row;
  gap: 1rem;
  grid-gap: 1rem;
`;

export const DetailsCard = styled(Box).withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) =>
    !["disablePadding"].includes(prop) && defaultValidatorFn(prop),
})<{ disablePadding?: boolean }>`
  border-radius: 8px;
  padding: ${({disablePadding}) => disablePadding ? '0rem' : '2.25rem'};
  border: 1px solid #000;
`;

export const DashboardContainerLeftSide = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 300px;
`;

export const DashboardContainerRightSide = styled(Box)`
  min-width: 300px;
`;

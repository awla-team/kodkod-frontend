import styled from "styled-components";
import { Box } from "@mui/material";

export const DashboardContainer = styled(Box)`
  display: grid;
  grid-template-columns: repeat(2, minmax(300px, 50%));
  grid-auto-flow: row;
  gap: 1rem;
  grid-gap: 1rem;
`;

export const DetailsCard = styled(Box)`
  border-radius: 8px;
  background-color: #FFF;
  border: 1px solid rgba(33, 33, 33, 0.08);
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

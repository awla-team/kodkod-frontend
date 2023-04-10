import styled from "styled-components";
import { Box } from "@mui/material";

export const KPIBox = styled(Box)`
  border: 1px solid gray;
  border-radius: 8px 8px;
  background: rgba(0, 0, 0, 0.9);
  width: 260px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const AdventureProgressContainer = styled(Box)`
  border-radius: 8px 8px 0px 0px;
  color: #FFF;
  box-shadow: rgb(0, 0, 0) 0px 0px 200px 60px inset;
  background-position: center;
  background-size: cover;
`;
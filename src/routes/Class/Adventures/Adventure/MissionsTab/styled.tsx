import { Dialog } from "@mui/material";
import styled from "styled-components";

export const MissionsListContainer = styled.div`  
  width: 100%;
  background: #EFF3FF;
  border-radius: 8px;
  border: 1px solid #D1D1D1;
  padding: 24px;
  color: ${(props) => props.theme.palette.primary.dark};

  hr {
    z-index: 0;
    width: 54px;
    margin-left: -10px;
    margin-right: -10px;
    border-top: 2px solid #4A4A4A;
    opacity: 0.6;
  }

  .mission-card {
    height: 100%;
    &:hover {
      outline: 2px solid black;
    }
  }

  .stage-icon-container {
    z-index: 1;
  }
`;

export const StagesStepper = styled.div`
  color: #4A4A4A;
`;

export const MissionDialog = styled(Dialog)`
  .mission-card {
    transform: scale(2);
  }
`;
import { Box } from "@mui/material";
import styled from "styled-components";

export const RewardsList = styled(Box)`
  &.inactive-rewards {
    .reward-icon {
      opacity: 0.3;
    }
  }
`;

export const RewardIcon = styled(Box)`
  background: #fff;
  border: 1px solid gray;
  border-radius: 100%;
  height: 64px;
  width: 64px;

  &.selected {
    background: ${(props) => props.theme.palette.success.light}
  }
`;
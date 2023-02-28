import { FC } from "react";
import { RewardsViewContainer } from "./styled";
import { Box } from "@mui/material";
import { Link as RouterLink, useParams } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const RewardsView: FC = () => {
  const { classId } = useParams();
  return (
    <RewardsViewContainer>
      <Box
        component={RouterLink}
        to={`/cursos/${classId}/aventuras`}
        className={"back__navigation__container"}
      >
        <ArrowBackIosNewIcon />
        <span>Back to adventure</span>
      </Box>

      <Box className={"rewards__sections"}></Box>
    </RewardsViewContainer>
  );
};

export default RewardsView;

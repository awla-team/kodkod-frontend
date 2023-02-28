import { FC } from "react";
import { RewardsViewContainer } from "./styled";
import { Box } from "@mui/material";
import { Link as RouterLink, useParams } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import RewardCard from "../RewardCard";

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

      <Box className={"rewards__sections"}>
        <Box className={"header__text"}>Individual rewards</Box>
        <Box className={"subheading__text"}>
          <p>
            Individual rewards are automatically unlocked once you reach the
            required experience. Then, you just have to tell your teacher to use
            them!
          </p>
        </Box>
        <Box className={"rewards__container"}>
          <Box className={"rewards__scrollable__container"}>
            {Array(10)
              .fill("")
              .map((res, index) => {
                return (
                  <RewardCard
                    key={index}
                    title={"Invisibility cloak"}
                    description={"You can leave 10 minutes before recess"}
                    icon={""}
                    requiredPoints={100}
                    type={"single"}
                  />
                );
              })}
          </Box>
        </Box>
      </Box>

      <Box className={"rewards__sections"}>
        <Box className={"header__text"}> Class rewards </Box>
        <Box className={"subheading__text"}>
          <p>
            To unlock these rewards, you need to get the requested experience
            among the entire class. This will reward everyone equally!
          </p>
        </Box>
        <Box className={"rewards__container"}>
          <Box className={"rewards__scrollable__container"}>
            {Array(10)
              .fill("")
              .map((res, index) => {
                return (
                  <RewardCard
                    key={index}
                    title={"Invisibility cloak"}
                    description={"You can leave 10 minutes before recess"}
                    icon={""}
                    requiredPoints={100}
                    type={"course"}
                  />
                );
              })}
          </Box>
        </Box>
      </Box>
    </RewardsViewContainer>
  );
};

export default RewardsView;

import { FC, useEffect, useState } from "react";
import { RewardsViewContainer } from "./styled";
import { Box } from "@mui/material";
import { Link as RouterLink, useParams } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import RewardCard from "../RewardCard";
import { useSearchParams } from "react-router-dom";
import { getRewards } from "../../services/rewards";
import { IReward } from "../../global/interfaces";
import Toaster from "../../utils/Toster";

const RewardsView: FC = () => {
  const { classId } = useParams();
  const [searchParams] = useSearchParams();
  const [rewards, setRewards] = useState<IReward[]>([]);

  useEffect(() => {
    const id = searchParams.get("adventureId");
    if (id) {
      getAllRewards(id);
    }
  }, []);

  const getAllRewards = async (adventureId: number | string) => {
    try {
      const { data }: { data: { responseData: IReward[] } } = await getRewards({
        id_class: classId,
        id_adventure: adventureId,
      });
      setRewards(data.responseData);
    } catch (e: any) {
      Toaster("error", e.message);
    }
  };
  return (
    <RewardsViewContainer>
      <Box
        component={RouterLink}
        to={`cursos/${classId}/aventuras`}
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
            {rewards.map((res, index) => {
              return (
                <RewardCard
                  key={index}
                  title={res.title}
                  description={res.description}
                  icon={""}
                  requiredPoints={100}
                  type={res.type}
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
                    type={"class"}
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

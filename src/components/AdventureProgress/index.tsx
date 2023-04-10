import { FC, useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { useClassContext } from "routes/Class/context";
import SkillPoints from "components/SkillPoints";
import { IAdventure, IStage } from "global/interfaces";
import { AdventureProgressContainer, KPIBox } from "./styled";

const AdventureProgress: FC<{
  adventure: IAdventure;
  progressPercentage: number;
  averageCompletedMission: number;
}> = ({ adventure, progressPercentage = 0, averageCompletedMission = 0 }) => {
  const { classDetails } = useClassContext();
  const [latestStage, setLatestStage] = useState<IStage>(undefined);

  useEffect(() => {
    if (classDetails?.current_adventure?.stages?.length) {
      const filtered = classDetails.current_adventure.stages.filter(
        (stage) => stage.active
      );
      const newLatestStage = [...filtered].sort((a, b) => {
        if (a._index > b._index) return 1;
        if (a._index < b._index) return -1;
        return 0;
      });
      setLatestStage(newLatestStage[newLatestStage.length - 1]);
    }
  }, [classDetails]);

  return (
    <AdventureProgressContainer
      className="d-flex align-items-center justify-content-between p-5"
      sx={{ backgroundImage: `url(${latestStage?.icon})` }}
    >
      <Box>
        <Box
          display={"flex"}
          sx={{ position: "relative" }}
          alignItems={"start"}
          justifyContent={"space-between"}
        >
          <Typography
            component="h2"
            variant="h2"
            title={classDetails.alias}
            fontWeight="bold"
            className="mb-2"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            {classDetails.alias}
          </Typography>
        </Box>
        <Typography
          variant="h5"
          fontWeight="bold"
        >{`${classDetails.current_adventure?.title}`}</Typography>
        <Typography
          variant="body1"
          fontWeight="bold"
          className="mb-4"
        >{`Etapa ${latestStage?._index}: ${latestStage?.title}`}</Typography>
        <section className="d-flex flex-column mb-3">
          <div className="d-flex flex-wrap flex-lg-nowrap gap-2">
            {!!classDetails.current_adventure?.skills?.length
              ? classDetails.current_adventure.skills.map(
                  (adventureSkill, index) => (
                    <SkillPoints
                      key={`${adventureSkill.id}-${adventureSkill.title}-${index}`}
                      skill={adventureSkill}
                    />
                  )
                )
              : null}
          </div>
        </section>
      </Box>
      <div className="d-flex gap-2">
        <KPIBox className="p-4">
          <Typography
            variant="h3"
            component="h3"
            fontWeight="bold"
          >{`${Math.round(progressPercentage)}%`}</Typography>
          <Typography>de misiones completadas en la aventura</Typography>
        </KPIBox>
        <KPIBox className="p-4">
          <Typography
            variant="h3"
            component="h3"
            fontWeight="bold"
          >{`${Math.round(averageCompletedMission)}`}</Typography>
          <Typography>
            misiones completadas por estudiante en promedio{" "}
          </Typography>
        </KPIBox>
      </div>
    </AdventureProgressContainer>
  );
};

export default AdventureProgress;

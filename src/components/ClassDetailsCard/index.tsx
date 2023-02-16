import { DetailsCardContent } from "./styled";
import { ClassDetailsCardProps } from "./interfaces";
import { FC, useMemo } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ClassDetailsCard: FC<ClassDetailsCardProps> = ({ classDetails }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/cursos/${classDetails.id}/aventuras`);
  };

  const hasAdventure: boolean = useMemo(() => {
    return classDetails && !!classDetails.adventures?.length;
  }, [classDetails]);
  return (
    <DetailsCardContent>
      <div className={"card__title"}>
        <h1 className={"card__title__text"}>{classDetails.alias}</h1>
        <button className={"card__title__notification"} />
      </div>
      <div className={"card__content"}>
        <p className={"adventure__status"}>
          {hasAdventure
            ? "You have an ongoing adventure!"
            : "You haven't selected an adventure yet."}
        </p>
        <p className={"adventure__details"}>
          <b>
            {" "}
            {hasAdventure
              ? "With the reward in mind - Stage 2"
              : "Go to adventure to start working with your students"}
          </b>
        </p>
      </div>
      <div className={"card__action"}>
        <Button variant={"contained"} onClick={handleNavigate}>
          {hasAdventure ? "Continue adventure" : "Start an adventure"}
        </Button>
      </div>
    </DetailsCardContent>
  );
};

export default ClassDetailsCard;

import { DetailsCardContent } from "./styled";
import { ClassDetailsCardProps } from "./interfaces";
import { FC } from "react";
import { Button } from "@mui/material";

const ClassDetailsCard: FC<ClassDetailsCardProps> = ({ classDetails }) => {
  return (
    <DetailsCardContent>
      <div className={"card__title"}>
        <h1 className={"card__title__text"}>{classDetails.alias}</h1>
        <button className={"card__title__notification"} />
      </div>
      <div className={"card__content"}>
        <p className={"adventure__status"}>
          {true
            ? "You have an ongoing adventure!"
            : "You haven't selected an adventure yet."}
        </p>
        <p className={"adventure__details"}>
          <b>
            {" "}
            {true
              ? "With the reward in mind - Stage 2"
              : "Go to adventure to start working with your students"}
          </b>
        </p>
      </div>
      <div className={"card__action"}>
        <Button variant={"contained"}>
          {true ? "Continue adventure" : "Start an adventure"}
        </Button>
      </div>
    </DetailsCardContent>
  );
};

export default ClassDetailsCard;
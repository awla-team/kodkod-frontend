import { ClassInterface } from "services/classes/interfaces";
import { Levels } from "../Modals/CreateClassModal/interfaces";
import React from "react";

export interface ClassDetailsCardProps {
  classDetails: ClassInterface;
  levels: Levels[];
}

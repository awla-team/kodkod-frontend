import React, {
  FC,
  useContext,
  forwardRef,
  useMemo,
  useState,
  ForwardRefRenderFunction,
} from "react";
import * as Styled from "./styled";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Avatar,
  Button,
} from "@mui/material";
import { StudentType } from "../../StudentsList/interfaces";

import { StudentsSelectableListProps } from "./interfaces";
import { AdventureContext } from "routes/Class/Adventures/Adventure/provider";
import Toaster from "../../../utils/Toster";
import { missionAccomplished } from "../../../services/missions";
import { IStage } from "../../../global/interfaces";

export const StudentsSelectableList: React.ForwardRefExoticComponent<
  StudentsSelectableListProps & React.RefAttributes<HTMLButtonElement>
> = forwardRef(({ mission }, ref) => {
  const { adventure } = useContext(AdventureContext);

  const stage = useMemo((): IStage | null => {
    if (adventure.stages && adventure.stages.length) {
      return adventure.stages[0];
    }
    return null;
  }, [adventure]);

  const [selected, setSelected] = useState<any>({});

  const { students: studentsList } = useContext(AdventureContext);

  const selectedLength = useMemo(() => {
    return Object.keys(selected).length;
  }, [selected]);

  const handleCheck = (
    { target }: React.ChangeEvent<HTMLInputElement>,
    value: number | string
  ) => {
    return setSelected((prevState: any) => {
      const tempState = { ...prevState };
      if (value in tempState) {
        delete tempState[value];
      } else {
        tempState[value] = true;
      }
      return tempState;
    });
  };

  const handleAllSelect = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = target;
    const selectAll: any = {};
    if (checked) {
      studentsList.forEach((res, index) => {
        selectAll[res.id] = true;
      });
      return setSelected(selectAll);
    }
    return setSelected({});
  };

  const handleSave = async () => {
    try {
      if (!stage || !Object.keys(selected).length) return;
      const { data }: { data: { responseData: any } } =
        await missionAccomplished({
          studentIds: Object.keys(selected).map((key) => +key),
          id_mission: mission.id as number,
          id_stage: stage.id as number,
        });
      Toaster("success", "data saved successfully!");
    } catch (e: any) {
      Toaster("error", e.message);
    }
  };
  return (
    <Styled.StudentListContainer>
      <TextField
        variant={"standard"}
        placeholder={"Search by first or last name"}
        fullWidth
      />
      <div className={"students__list"}>
        <FormControlLabel
          control={
            <Checkbox
              onChange={handleAllSelect}
              checked={
                !!studentsList.length &&
                studentsList.every((res, index) => selected[res.id])
              }
            />
          }
          label={"Select all"}
        />
        <div className={"scrollable__container"}>
          {studentsList.map((res, index) => {
            return (
              <div key={index} className={"student__detail__container"}>
                <Styled.Checkbox
                  onChange={(e) => handleCheck(e, res.id)}
                  checked={!!selected[res.id]}
                />
                <div className={"student__detail"}>
                  <Avatar />
                  <div className={"student__details__text"}>
                    <div className={"student_name"}>
                      {`${res.first_name} ${res.last_name}`}
                    </div>
                    <div className={"student__email"}>{`${res.email}`}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={"student__selection__count"}>
        <b>{selectedLength}</b> of <b>{studentsList.length}</b> students
        selected
      </div>
      <Button ref={ref} sx={{ display: "none" }} onClick={handleSave} />
    </Styled.StudentListContainer>
  );
});

export default StudentsSelectableList;

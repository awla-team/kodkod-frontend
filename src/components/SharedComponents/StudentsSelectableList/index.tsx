import React, { FC, useContext, useEffect, useMemo, useState } from "react";
import * as Styled from "./styled";
import { TextField, FormControlLabel, Checkbox, Avatar } from "@mui/material";
import { StudentType } from "../../StudentsList/interfaces";

import { StudentsSelectableListProps } from "./interfaces";
import { AdventureContext } from "routes/Class/Adventures/Adventure/provider";
import studentsList from "../../StudentsList";

export const StudentsSelectableList: FC<StudentsSelectableListProps> = ({
  mission,
}) => {
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
    </Styled.StudentListContainer>
  );
};

export default StudentsSelectableList;

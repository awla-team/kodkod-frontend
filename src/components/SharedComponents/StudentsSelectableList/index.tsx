import React, { FC, useState } from "react";
import * as Styled from "./styled";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Avatar,
  Button,
} from "@mui/material";

export const StudentsSelectableList: FC = () => {
  const [selected, setSelected] = useState<any>({});
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
      Array(10)
        .fill(true)
        .forEach((res, index) => {
          selectAll[index] = res;
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
              checked={Array(10)
                .fill(true)
                .every((key, index) => selected[index])}
            />
          }
          label={"Select all"}
        />
        <div className={"scrollable__container"}>
          {Array(10)
            .fill("")
            .map((res, index) => {
              return (
                <div key={index} className={"student__detail__container"}>
                  <Styled.Checkbox
                    onChange={(e) => handleCheck(e, index)}
                    checked={!!selected[index]}
                  />
                  <div className={"student__detail"}>
                    <Avatar />
                    <div className={"student__details__text"}>
                      <div className={"student_name"}>
                        Álvaro Arratia Ramirez
                      </div>
                      <div className={"student__email"}>
                        a.arratia@colegio.cl
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className={"student__selection__count"}>
        <b>5</b> of <b>5</b> students selected
      </div>
    </Styled.StudentListContainer>
  );
};

export default StudentsSelectableList;

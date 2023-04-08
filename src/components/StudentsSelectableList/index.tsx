import React, {
  useContext,
  useState,
  useEffect,
} from "react";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Avatar,
  Button,
  Typography,
} from "@mui/material";
import { StudentsSelectableListProps } from "./interfaces";
import { AdventureContext } from "routes/Class/Adventures/Adventure/provider";
import Toaster from "utils/Toster";
import { missionAccomplished } from "services/missions";
import { StudentListContainer } from "./styled";

export const StudentsSelectableList: React.FC<StudentsSelectableListProps> = ({ stage, mission, studentsDetails, handleClose }) => {

  const [selected, setSelected] = useState<any>({});
  const [defaultSelected, setDefaultSelected] = useState<any>({});

  const { students: studentsList } = useContext(AdventureContext);

  useEffect(() => {
    if (studentsDetails) {
      const selectedDetail: any = {};
      studentsDetails.forEach((detail) => {
        selectedDetail[detail.id_user] = true;
      });
      setDefaultSelected((prevState: any) => ({ ...prevState, ...selectedDetail }));
    }
  }, [studentsDetails]);

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
        if (!defaultSelected[res.id]) selectAll[res.id] = true;
      });
      return setSelected(selectAll);
    }
    return setSelected({});
  };

  const handleSave = async () => {    
    try {
      if (!stage) return;
      const { data }: { data: { responseData: any } } =
        await missionAccomplished({
          studentIds: Object.keys(selected).map((key) => +key),
          id_mission: mission.id as number,
          id_stage: stage.id as number,
        });
      Toaster("success", "data saved successfully!");
      handleClose();
    } catch (e: any) {
      Toaster("error", e.message);
    }
  };
  
  return (
    <StudentListContainer className="d-flex flex-column">
      <TextField className="mb-3" variant={"standard"} placeholder="Buscar por nombre o apellido" fullWidth />
      <div className="d-flex flex-column flex-fill">
        <FormControlLabel
          sx={{ marginLeft: 0 }}
          label="Seleccionar a todos"
          className="mb-3"
          control={
            <Checkbox
              onChange={handleAllSelect}
              disabled={studentsList.every((student) => defaultSelected[student.id])}
              checked={
                !!studentsList.length &&
                studentsList.every((res, index) => selected[res.id] || defaultSelected[res.id])
              }
            />
          }          
        />
        <div className="d-flex flex-column gap-3">
          {studentsList.map((res, index) => (
            <div key={index} className="d-flex gap-2 align-items-center">
              <Checkbox
                onChange={(e) => handleCheck(e, res.id)}
                disabled={!!defaultSelected[res.id]}
                checked={!!selected[res.id] || !!defaultSelected[res.id]}
              />
              <div className="d-flex align-items-center gap-3">
                <Avatar className="student-avatar">{`${res.first_name[0]}${res.last_name[0]}`}</Avatar>
                <div className="d-flex flex-column">
                  <Typography component="span" variant="body1">{`${res.first_name} ${res.last_name}`}</Typography>
                  <Typography component="span" variant="body2" color="#969696">{res.email}</Typography>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Typography component="span" variant="body2" className="mb-3" textAlign="end"><b>{Object.keys(selected).length + Object.keys(defaultSelected).length}</b> de <b>{studentsList.length}</b> estudiantes han cumplido esta misión</Typography>
      <div className="d-flex gap-2 justify-content-end">
        <Button onClick={handleClose} variant="outlined">Cancelar</Button>
        <Button onClick={handleSave} variant="contained" disabled={!Object.keys(selected).length}>Guardar cambios</Button>
      </div>
      
    </StudentListContainer>
  );
};

export default StudentsSelectableList;

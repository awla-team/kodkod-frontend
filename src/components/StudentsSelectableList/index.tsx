import React, { useContext, useState, useEffect } from 'react';
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Avatar,
  Button,
  Typography,
} from '@mui/material';
import { StudentsSelectableListProps } from './interfaces';
import { AdventureContext } from 'routes/Class/Adventures/Adventure/provider';
import Toaster from 'utils/Toster';
import { missionAccomplished } from 'services/missions';
import { StudentListContainer } from './styled';

export const StudentsSelectableList: React.FC<StudentsSelectableListProps> = ({
  stage,
  mission,
  onSave,
  handleClose,
}) => {
  const [selected, setSelected] = useState<(number | string)[]>([]);
  const [defaultSelected, setDefaultSelected] = useState<(number | string)[]>(
    []
  );
  const { students } = useContext(AdventureContext);
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    !!students && setStudentList(students);
  }, [students]);

  useEffect(() => {
    if (mission?.completed_users)
      setDefaultSelected(mission.completed_users.filter((user) => Boolean(user)).map((user) => user?.id));
  }, [mission]);

  const handleCheck = (
    { target }: React.ChangeEvent<HTMLInputElement>,
    value: number | string
  ) => {
    return setSelected((prevState) => {
      const temp = [...prevState];
      if (temp.includes(value)) {
        const index = temp.indexOf(value);
        temp.splice(index, 1);
      } else {
        temp.push(value);
      }
      return temp;
    });
  };

  const handleAllSelect = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = target;
    const all: (number | string)[] = [];
    if (checked) {
      studentList.forEach((res, index) => {
        if (!defaultSelected.includes(res.id)) all.push(res.id);
      });
      return setSelected(all);
    }
    return setSelected([]);
  };

  const handleSave = async () => {
    try {
      if (!stage) return;
      await missionAccomplished({
        studentIds: selected,
        id_mission: mission.id as number,
        id_stage: stage.id as number,
      });
      Toaster('success', 'Misión completada exitosamente');
      onSave(stage.id);
      handleClose();
    } catch (error: any) {
      console.error(error);
      Toaster('error', 'Hubo un error al completar las misiones');
    }
  };

  return (
    <StudentListContainer id="mission-complete-modal-list" className="d-flex flex-column overflow-hidden">
      <TextField
        className="mb-3"
        variant={'standard'}
        placeholder="Buscar por nombre o apellido"
        fullWidth
        onChange={(event) => {
          if (!event.target.value) return setStudentList(students);
          setStudentList(
            studentList.filter((student) =>
              `${student.first_name} ${student.last_name}`.includes(
                event.target.value
              )
            )
          );
        }}
      />
      <div className="d-flex flex-column flex-fill gap-4 overflow-hidden">
        <div className="d-flex w-100 align-items-center justify-content-between">
          <FormControlLabel
            id="mission-complete-modal-all"
            sx={{ marginLeft: 0 }}
            label="Seleccionar a todos"
            className="mb-3"
            control={
              <Checkbox
                onChange={handleAllSelect}
                disabled={studentList.every((student) =>
                  defaultSelected.includes(student.id)
                )}
                checked={
                  !!studentList.length &&
                  studentList.every(
                    (res, index) =>
                      selected.includes(res.id) ||
                      defaultSelected.includes(res.id)
                  )
                }
              />
            }
          />
          <div className="d-flex flex-column">
            <div className="d-flex gap-2 justify-content-end">
              <Button id="mission-complete-modal-cancel" onClick={handleClose} variant="outlined">
                Cancelar
              </Button>
              <Button
                id="mission-complete-modal-save"
                onClick={handleSave}
                variant="contained"
                disabled={!Object.keys(selected).length}
              >
                Guardar cambios
              </Button>
            </div>
            <Typography component="span" variant="body2" textAlign="end">
              <b>
                {Object.keys(selected).length +
                  Object.keys(defaultSelected).length}
              </b>{' '}
              de <b>{students.length}</b> estudiantes han cumplido esta misión
            </Typography>
          </div>
        </div>
        <div className="d-flex flex-column gap-3 overflow-auto">
          {studentList.map((res, index) => (
            <div key={index} className="d-flex gap-2 align-items-center">
              <Checkbox
                onChange={(e) => handleCheck(e, res.id)}
                disabled={defaultSelected.includes(res.id)}
                checked={
                  selected.includes(res.id) || defaultSelected.includes(res.id)
                }
              />
              <div className="d-flex align-items-center gap-3">
                <Avatar className="student-avatar">{`${res.first_name[0]}${res.last_name[0]}`}</Avatar>
                <div className="d-flex flex-column">
                  <Typography
                    component="span"
                    variant="body1"
                  >{`${res.first_name} ${res.last_name}`}</Typography>
                  <Typography component="span" variant="body2" color="#969696">
                    {res.email}
                  </Typography>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StudentListContainer>
  );
};

export default StudentsSelectableList;

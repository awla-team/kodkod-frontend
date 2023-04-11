import React, { useContext, useState, useEffect } from 'react';
import { TextField, FormControlLabel, Checkbox, Avatar, Button, Typography } from '@mui/material';
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
  const [defaultSelected, setDefaultSelected] = useState<(number | string)[]>([]);
  const { students: studentsList } = useContext(AdventureContext);

  useEffect(() => {
    if (mission?.completed_users)
      setDefaultSelected(mission.completed_users.map((user) => user.id));
  }, [mission]);

  const handleCheck = ({ target }: React.ChangeEvent<HTMLInputElement>, value: number | string) => {
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
      studentsList.forEach((res, index) => {
        if (!defaultSelected.includes(res.id)) all.push(res.id);
      });
      return setSelected(all);
    }
    return setSelected([]);
  };

  const handleSave = async () => {
    try {
      if (!stage) return;
      const { data }: { data: { responseData: any } } = await missionAccomplished({
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
    <StudentListContainer className="d-flex flex-column">
      <TextField
        className="mb-3"
        variant={'standard'}
        placeholder="Buscar por nombre o apellido"
        fullWidth
      />
      <div className="d-flex flex-column flex-fill">
        <FormControlLabel
          sx={{ marginLeft: 0 }}
          label="Seleccionar a todos"
          className="mb-3"
          control={
            <Checkbox
              onChange={handleAllSelect}
              disabled={studentsList.every((student) => defaultSelected.includes(student.id))}
              checked={
                !!studentsList.length &&
                studentsList.every(
                  (res, index) => selected.includes(res.id) || defaultSelected.includes(res.id)
                )
              }
            />
          }
        />

        <div className="d-flex flex-column gap-3">
          {studentsList.map((res, index) => (
            <div key={index} className="d-flex gap-2 align-items-center">
              <Checkbox
                onChange={(e) => handleCheck(e, res.id)}
                disabled={defaultSelected.includes(res.id)}
                checked={selected.includes(res.id) || defaultSelected.includes(res.id)}
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
      <Typography component="span" variant="body2" className="mb-3" textAlign="end">
        <b>{Object.keys(selected).length + Object.keys(defaultSelected).length}</b> de{' '}
        <b>{studentsList.length}</b> estudiantes han cumplido esta misión
      </Typography>
      <div className="d-flex gap-2 justify-content-end">
        <Button onClick={handleClose} variant="outlined">
          Cancelar
        </Button>
        <Button onClick={handleSave} variant="contained" disabled={!Object.keys(selected).length}>
          Guardar cambios
        </Button>
      </div>
    </StudentListContainer>
  );
};

export default StudentsSelectableList;

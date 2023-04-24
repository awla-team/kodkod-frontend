import React, { FC } from 'react';
import { AddStudentsDialogProps, FormInitialState } from './interfaces';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { FormikHelpers } from 'formik';
import { useState } from 'react';
import { addStudentsInClass } from 'services/students';
import Toaster from 'utils/Toster';
import * as Yup from 'yup';
import { StudentType } from '../../StudentsList/interfaces';
import { StudentsFormDetailsContainer } from './styled';
import { Link } from 'react-router-dom';
import { read, utils } from 'xlsx';
import AddIcon from '@mui/icons-material/Add';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';

const AddStudentsDialog: FC<AddStudentsDialogProps> = ({ open, onClose, classDetails }) => {
  const [students, setStudents] = useState<{ first_name: string; last_name: string; email: string; }[]>(
    Array(5).fill({
      first_name: null,
      last_name: null,
      email: null,
    })
  );
  const handleSubmit = async (
    values: FormInitialState,
    formikHelper: FormikHelpers<FormInitialState>
  ) => {
    // temporary approach
    try {
      const { data }: { data: { responseData: { students: StudentType[] } } } =
        await addStudentsInClass({
          id_class: classDetails.id,
          students: values.students.map(({ first_name, last_name, email }) => {
            return {
              first_name,
              last_name,
              email,
              role: 'student',
            };
          }),
        });
      const noOfStudents = values.students.length;
      Toaster(
        'success',
        `${noOfStudents} ${noOfStudents < 2 ? 'estudiante' : 'estudiantes'} añadidos exitosamente`
      );
      onClose('student', data.responseData.students);
    } catch (error: any) {
      console.error(error);
      Toaster(
        'error',
        error?.response?.data?.responseData[0] || 'Hubo un error al añadir estudiantes'
      );
    } finally {
      formikHelper.setSubmitting(false);
    }
  };

  const handleImport = ($event: React.ChangeEvent<HTMLInputElement>) => {
    const files = $event.target.files;

    if (files.length) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const wb = read(event.target.result);
        const sheets = wb.SheetNames;
        if (sheets.length) {
          const rows: { Nombres: string; Apellidos: string; Email: string }[] = utils.sheet_to_json(
            wb.Sheets[sheets[0]]
          );
          setStudents(
            rows.map((student) => ({
              first_name: student.Nombres,
              last_name: student.Apellidos,
              email: student.Email,
            }))
          );
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <Dialog open={open} PaperProps={{ className: 'p-3' }} maxWidth="sm" fullWidth fullScreen>
      <DialogTitle fontWeight="bold">Añadir estudiantes</DialogTitle>
      <DialogContent className="d-flex flex-column h-100">
        <Typography variant="body2" className="mb-2">
          Añade a tus estudiantes ingresando sus nombres, apellidos y correo. También puedes
          subir tus estudiantes con nuestra plantilla de excel.
        </Typography>
        <div>
          <Button
            variant="outlined"
            component={Link}
            to="https://kodkod-assets.s3.amazonaws.com/documents/plantilla_estudiantes_kodkod.xlsx"
            download
            className="me-1"
            color="primary"
            size="small"
            startIcon={<FileDownloadIcon />}
          >
            Descargar plantilla excel
          </Button>
          <input
            style={{ display: 'none' }}
            type="file"
            name="file"
            id="inputGroupFile"
            onChange={handleImport}
            accept=".xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          />
          <Button
            component="label"
            variant="contained"
            size="small"
            startIcon={<FileUploadIcon />}
            htmlFor="inputGroupFile"
          >
            Subir plantilla excel
          </Button>
        </div>
        <form className="flex-fill my-4" style={{ overflow: 'auto' }}>
          <StudentsFormDetailsContainer className="d-flex flex-column justify-content-between">
            <Box className="details-list">
              {students.map((student, i) => (
                <div key={i} className="d-flex align-items-center gap-2">
                  <IconButton
                    color="inherit"
                    size="small"
                    disabled={students.length === 1}
                    onClick={() => {
                      const newValues = { ...students };
                      newValues.splice(i, 1);
                      setStudents(newValues);
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                  <div className="d-flex w-100 gap-3">
                    <div className="flex-fill">
                      <TextField
                        value={student.first_name}
                        name={`students[${i}].first_name`}
                        variant="standard"
                        placeholder="Nombres"
                        fullWidth
                      />
                    </div>
                    <div className="flex-fill">
                      <TextField
                        value={student.last_name}
                        name={`students[${i}].last_name`}
                        variant="standard"
                        placeholder="Apellidos"
                        fullWidth
                      />
                    </div>
                    <div className="flex-fill">
                      <TextField
                        value={student.email}
                        name={`students[${i}].email`}
                        type="email"
                        variant="standard"
                        placeholder="E-mail"
                        fullWidth
                      />
                    </div>
                  </div>
                </div>
              ))}
            </Box>
          </StudentsFormDetailsContainer>
        </form>
        <div className="d-flex align-items-center justify-content-center">
          <Button
            startIcon={<AddIcon />}
            className="w-50 mb-2"
            color="primary"
            onClick={() => setStudents([ ...students, { first_name: null, last_name: null, email: null }])}
          >
            Añadir una fila
          </Button>
        </div>
        <div className="d-flex">
          <Typography
            textAlign="right"
            component="span"
            variant="body2"
            className="w-100 mt-2"
          >
            Estás añadiendo <b>{students.length}</b> estudiantes a la clase{' '}
            <b>{classDetails.alias}</b>
          </Typography>
        </div>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => onClose()}>
          Cancelar
        </Button>
        <Button
          variant="contained"
          type="submit"
        >
          Añadir estudiantes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddStudentsDialog;

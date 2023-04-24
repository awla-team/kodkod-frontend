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
import { Formik, Form, FormikHelpers, FieldArray } from 'formik';
import { useState } from 'react';
import { addStudentsInClass } from 'services/students';
import Toaster from 'utils/Toster';
import * as Yup from 'yup';
import { StudentType } from '../../StudentsList/interfaces';
import { CustomFileInput, StudentsFormDetailsContainer } from './styled';
import { Link } from 'react-router-dom';
import { read, utils, writeFile } from 'xlsx';

const AddStudentsDialog: FC<AddStudentsDialogProps> = ({ open, onClose, classDetails }) => {
  const [formInitialState, setFormInitialState] = useState<FormInitialState>({
    students: [{
      first_name: null,
      last_name: null,
      email: null,
    }],
  });
  const [inputFieldValue, setInputFieldValue] = useState<string>('');
  const [inputFieldValueError, setInputFieldValueError] = useState<boolean>(false);
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
            const rows: { Nombres: string; Apellidos: string; Email: string; }[] = utils.sheet_to_json(wb.Sheets[sheets[0]]);
            setFormInitialState({
              students: rows.map((student) => ({ first_name: student.Nombres, last_name: student.Apellidos, email: student.Email }))
            })
        }

        
        
      }
      reader.readAsArrayBuffer(file);
    }
  }

  const handleInputFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputFieldValue(value);
    if (inputFieldValueError) {
      setInputFieldValueError(false);
    }
  };

  const validationSchema = () => {
    return Yup.object().shape({
      students: Yup.array().of(
        Yup.object().shape({
          email: Yup.string().email().required(),
          first_name: Yup.string().required(),
          last_name: Yup.string().required(),
        })
      ),
    });
  };

  const addToList = (formikInitialValues: FormInitialState) => {
    setFormInitialState({
      ...formikInitialValues,
      students: [
        ...formikInitialValues.students,
        {
          first_name: null,
          last_name: null,
          email: null,
        }
      ],
    });
  };

  const handleStudentValues = (e: React.KeyboardEvent, formikInitialValues: FormInitialState) => {
    e.stopPropagation();
    const { key } = e;
    if (key === 'Enter') {
      e.preventDefault();
      addToList(formikInitialValues);
    }
  };

  const preventFormSubmitOnKeyDown = (e: React.KeyboardEvent) => {
    const { key } = e;
    if (key === 'Enter') {
      e.preventDefault();
    }
  };
  return (
    <Dialog open={open} PaperProps={{ className: 'p-3' }} maxWidth="sm" fullWidth>
      <DialogTitle fontWeight="bold">Añadir estudiantes</DialogTitle>
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={formInitialState}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, values, handleChange, isSubmitting, errors, submitCount }) => {
          return (
            <Form onSubmit={handleSubmit} onKeyDown={preventFormSubmitOnKeyDown}>
              <DialogContent dividers className="py-4">
                <Typography variant="body2" className="mb-2">Añade a tus estudiantes ingresando sus nombres, apellidos y correo. También puedes subir tus estudiantes con nuestra plantilla de excel</Typography>
                <div className="mb-3">
                  <Button
                    variant="outlined"
                    component={Link}
                    to="https://kodkod-assets.s3.amazonaws.com/documents/plantilla_estudiantes_kodkod.xlsx"
                    download
                    className="me-1"
                    color="primary"
                    size="small"
                  >
                    Descargar plantilla
                  </Button>
                  <input style={{ display: 'none' }} type="file" name="file" id="inputGroupFile" onChange={handleImport} accept=".xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
                  <Button component="label" variant="contained" size="small" htmlFor="inputGroupFile">Subir plantilla</Button>
                  {/*<Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={(event) => handleImport(event)}
                  >
                    Subir excel
                  </Button>                      */}
                </div>
                <StudentsFormDetailsContainer>
                  <>
                    <Box className="details-list">
                      <FieldArray name="students">
                        {() => {
                          return values.students.map((student, index) => {
                            return (
                              <div key={index} className="d-flex align-items-center gap-2">
                                <IconButton
                                  color="inherit"
                                  size="small"
                                  disabled={values.students.length === 1}
                                  onClick={() => {
                                    const newValues = { ...values };
                                    newValues.students.splice(index, 1);
                                    setFormInitialState(newValues);
                                  }}
                                >
                                  <CloseIcon fontSize="small" />
                                </IconButton>
                                <div className="d-flex w-100 gap-3">
                                  <div className="flex-fill">
                                    <TextField
                                      error={!!submitCount && !!errors?.students?.[index]}
                                      value={values.students[index].first_name}
                                      name={`students[${index}].first_name`}
                                      onChange={handleChange}
                                      variant="standard"
                                      placeholder="Nombres"
                                      fullWidth
                                    />
                                  </div>
                                  <div className="flex-fill">
                                    <TextField
                                      error={!!submitCount && !!errors?.students?.[index]}
                                      value={values.students[index].last_name}
                                      name={`students[${index}].last_name`}
                                      onChange={handleChange}
                                      variant="standard"
                                      placeholder="Apellidos"
                                      fullWidth
                                    />
                                  </div>
                                  <div>
                                    <TextField
                                      error={!!submitCount && !!errors?.students?.[index]}
                                      value={values.students[index].email}
                                      name={`students[${index}].email`}
                                      onChange={handleChange}
                                      type="email"
                                      variant="standard"
                                      placeholder="E-mail"
                                      fullWidth
                                    />
                                  </div>
                                </div>
                              </div>
                            );
                          });
                        }}
                      </FieldArray>
                      <Button
                        disabled={inputFieldValueError}
                        className="mt-2"
                        color="primary"
                        size="small"
                        onClick={() => addToList(values)}
                      >
                        Añadir una fila
                      </Button>
                    </Box>
                    <div className="d-flex">                      
                      <Typography
                        textAlign="right"
                        component="span"
                        variant="body2"
                        className="w-100 mt-2"
                      >
                        Estás añadiendo <b>{values.students.length}</b> estudiantes a la clase{' '}
                        <b>{classDetails.alias}</b>
                      </Typography>
                    </div>
                  </>
                </StudentsFormDetailsContainer>
              </DialogContent>
              <DialogActions>
                <Button variant="outlined" onClick={() => onClose()}>
                  Cancelar
                </Button>
                <Button
                  disabled={!values.students.length || !!isSubmitting}
                  variant="contained"
                  type="submit"
                >
                  Añadir estudiantes
                </Button>
              </DialogActions>
            </Form>
          );
        }}
      </Formik>
    </Dialog>
  );
};

export default AddStudentsDialog;

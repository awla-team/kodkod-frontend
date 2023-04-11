import React, { FC } from "react";
import { AddStudentsDialogProps, FormInitialState } from "./interfaces";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Formik, Form, FormikHelpers, FieldArray } from "formik";
import { useState } from "react";
import { addStudentsInClass } from "services/students";
import Toaster from "utils/Toster";
import * as Yup from "yup";
import { StudentType } from "../../StudentsList/interfaces";
import { StudentsFormDetailsContainer } from "./styled";

const AddStudentsDialog: FC<AddStudentsDialogProps> = ({
  open,
  onClose,
  classDetails,
}) => {
  const [formInitialState, setFormInitialState] = useState<FormInitialState>({
    students: [],
  });
  const [inputFieldValue, setInputFieldValue] = useState<string>("");
  const [inputFieldValueError, setInputFieldValueError] =
    useState<boolean>(false);
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
              role: "student",
            };
          }),
        });
      const noOfStudents = values.students.length;
      Toaster(
        "success",
        `${noOfStudents} ${
          noOfStudents < 2 ? "estudiante" : "estudiantes"
        } añadidos exitosamente`
      );
      onClose("student", data.responseData.students);
    } catch (error: any) {
      console.error(error);
      Toaster(
        "error",
        error?.response?.data?.responseData[0] ||
          "Hubo un error al añadir estudiantes"
      );
    } finally {
      formikHelper.setSubmitting(false);
    }
  };

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
    const transformedTextArray = inputFieldValue
      .split(",")
      .map((res) => res.trim())
      .filter((res) => res);
    const match = transformedTextArray
      .join(",")
      .match(/^([\w+-.%]+@[\w-.]+\.[A-Za-z]{2,4},?)+$/g);
    if (match) {
      setFormInitialState((prevState) => {
        return {
          students: [
            ...formikInitialValues.students,
            ...transformedTextArray.map((email) => ({
              first_name: "",
              last_name: "",
              email,
            })),
          ],
        };
      });
      setInputFieldValue("");
    } else {
      setInputFieldValueError(true);
    }
  };

  const handleStudentValues = (
    e: React.KeyboardEvent,
    formikInitialValues: FormInitialState
  ) => {
    e.stopPropagation();
    const { key } = e;
    if (key === "Enter" || key === ",") {
      e.preventDefault();
      addToList(formikInitialValues);
    }
  };

  const preventFormSubmitOnKeyDown = (e: React.KeyboardEvent) => {
    const { key } = e;
    if (key === "Enter" || key === ",") {
      e.preventDefault();
    }
  };
  return (
    <Dialog
      open={open}
      PaperProps={{ className: "p-3" }}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle fontWeight="bold">Añadir estudiantes</DialogTitle>
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={formInitialState}
        onSubmit={handleSubmit}
      >
        {({
          handleSubmit,
          values,
          handleChange,
          isSubmitting,
          errors,
          submitCount,
        }) => {
          return (
            <Form
              onSubmit={handleSubmit}
              onKeyDown={preventFormSubmitOnKeyDown}
            >
              <DialogContent dividers className="py-5">
                <StudentsFormDetailsContainer>
                  <div className="d-flex w-100 gap-2">
                    <TextField
                      className="mb-4"
                      error={inputFieldValueError}
                      helperText={
                        inputFieldValueError &&
                        "Has ingresado un email inválido"
                      }
                      value={inputFieldValue}
                      onKeyDown={(event) => handleStudentValues(event, values)}
                      onChange={handleInputFieldChange}
                      fullWidth
                      size="small"
                      placeholder={
                        "Emails de tus estudiantes separados por coma"
                      }
                    />
                    <div>
                      <Button
                        sx={{
                          mt: "1px",
                        }}
                        disabled={inputFieldValueError}
                        variant="contained"
                        color="primary"
                        onClick={() => addToList(values)}
                      >
                        Añadir
                      </Button>
                    </div>
                  </div>
                  <>
                    <div className="details-list">
                      <FieldArray name={"students"}>
                        {({ remove }) => {
                          return values.students.map((student, index) => {
                            return (
                              <div
                                key={index}
                                className="d-flex align-items-center"
                              >
                                <div className="me-2">
                                  <IconButton
                                    color={"inherit"}
                                    size="small"
                                    onClick={() => remove(index)}
                                  >
                                    <CloseIcon fontSize="small" />
                                  </IconButton>
                                </div>
                                <div className="d-flex">
                                  <div className="me-3">
                                    <TextField
                                      error={
                                        !!submitCount &&
                                        !!errors?.students?.[index]
                                      }
                                      value={values.students[index].first_name}
                                      name={`students[${index}].first_name`}
                                      onChange={handleChange}
                                      variant={"standard"}
                                      placeholder={"Nombres"}
                                      fullWidth
                                    />
                                  </div>
                                  <div className="me-3">
                                    <TextField
                                      error={
                                        !!submitCount &&
                                        !!errors?.students?.[index]
                                      }
                                      value={values.students[index].last_name}
                                      name={`students[${index}].last_name`}
                                      onChange={handleChange}
                                      variant={"standard"}
                                      placeholder={"Apellidos"}
                                      fullWidth
                                    />
                                  </div>
                                </div>
                                <div>
                                  <TextField
                                    error={
                                      !!submitCount &&
                                      !!errors?.students?.[index]
                                    }
                                    value={values.students[index].email}
                                    name={`students[${index}].email`}
                                    onChange={handleChange}
                                    type={"email"}
                                    variant={"standard"}
                                    placeholder={"E-mail"}
                                    fullWidth
                                  />
                                </div>
                              </div>
                            );
                          });
                        }}
                      </FieldArray>
                    </div>
                    <div className="d-flex">
                      <Typography
                        textAlign="right"
                        component="span"
                        variant="body2"
                        className="mt-4 w-100"
                      >
                        Estás añadiendo <b>{values.students.length}</b>{" "}
                        estudiantes a la clase <b>{classDetails.alias}</b>
                      </Typography>
                    </div>
                  </>
                </StudentsFormDetailsContainer>
              </DialogContent>
              <DialogActions>
                <Button variant={"outlined"} onClick={() => onClose()}>
                  Cancelar
                </Button>
                <Button
                  disabled={!values.students.length || !!isSubmitting}
                  variant={"contained"}
                  type={"submit"}
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

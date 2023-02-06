import React, { FC } from "react";
import * as Styled from "./styled";
import { AddStudentsDialogProps, FormInitialState } from "./interfaces";
import { IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Formik, Form, FormikHelpers, FieldArray } from "formik";
import { useState } from "react";
import { addStudentsInClass } from "services/students";
import Toaster from "utils/Toster";
import * as Yup from "yup";

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
      const requests = values.students.map((res) => {
        return addStudentsInClass({ ...res, classId: classDetails.id });
      });
      await Promise.all(requests);
      const noOfStudents = values.students.length;
      Toaster(
        "success",
        `${noOfStudents} ${
          noOfStudents < 2 ? "student" : "students"
        } successfully added`
      );
      onClose("success");
    } catch (e: any) {
      Toaster("error", e.message);
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
          name: Yup.string().required(),
        })
      ),
    });
  };

  const handleStudentValues = (e: React.KeyboardEvent) => {
    const { key } = e;
    if (key === "Enter") {
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
              ...prevState.students,
              ...transformedTextArray.map((email) => ({ name: "", email })),
            ],
          };
        });
        setInputFieldValue("");
      } else {
        setInputFieldValueError(true);
      }
    }
  };

  return (
    <Styled.StudentAddDialog
      scroll={"body"}
      open={open}
      disableEscapeKeyDown
      maxWidth={"sm"}
      fullWidth={true}
    >
      <Styled.StudentAddDialogTitle>
        <IconButton color={"inherit"} onClick={() => onClose()}>
          <CloseIcon />
        </IconButton>
      </Styled.StudentAddDialogTitle>
      <Styled.StudentAddDialogContent>
        <h1 className={"bold__header__20"}>Add students</h1>

        <TextField
          error={inputFieldValueError}
          helperText={inputFieldValueError && "You have entered invalid Email"}
          value={inputFieldValue}
          onKeyDown={handleStudentValues}
          onChange={handleInputFieldChange}
          fullWidth
          placeholder={"Enter the emails, separated by comma"}
        ></TextField>
        <Styled.StudentsFormDetailsContainer>
          <div className={"form__header"}>
            <div className={"header__action"}></div>

            <div className={"header__text"}>Full name</div>

            <div className={"header__text"}>Email address</div>
          </div>
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
                <Form onSubmit={handleSubmit}>
                  <div className={"student__details_container"}>
                    <div className={"details__list"}>
                      <FieldArray name={"students"}>
                        {({ remove }) => {
                          return values.students.map((student, index) => {
                            return (
                              <div key={index} className={"student__details"}>
                                <div className={"delete__action"}>
                                  <IconButton color={"inherit"}>
                                    <CloseIcon
                                      onClick={() => {
                                        setFormInitialState((prevState) => {
                                          return {
                                            students: prevState.students.filter(
                                              (_, SIndex) => index !== SIndex
                                            ),
                                          };
                                        });
                                      }}
                                    />
                                  </IconButton>
                                </div>
                                <div className={"input__field"}>
                                  <TextField
                                    error={
                                      !!submitCount &&
                                      !!errors?.students?.[index]
                                    }
                                    value={values.students[index].name}
                                    name={`students[${index}].name`}
                                    onChange={handleChange}
                                    variant={"standard"}
                                    fullWidth
                                  />
                                </div>
                                <div className={"input__field"}>
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
                                    fullWidth
                                  />
                                </div>
                              </div>
                            );
                          });
                        }}
                      </FieldArray>
                    </div>
                    <div className={"details__helper__text"}>
                      You are adding <b>{values.students.length}</b> students to{" "}
                      <b>{classDetails.alias}</b> class
                    </div>
                  </div>

                  <div className={"action__container"}>
                    <Styled.ActionButton
                      disabled={!values.students.length || isSubmitting}
                      variant={"contained"}
                      type={"submit"}
                    >
                      Add students
                    </Styled.ActionButton>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </Styled.StudentsFormDetailsContainer>
      </Styled.StudentAddDialogContent>
    </Styled.StudentAddDialog>
  );
};

export default AddStudentsDialog;

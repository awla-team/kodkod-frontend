import React, { useEffect, useState } from "react";
import * as Styled from "./styled";
import {
  Typography,
  CardContent,
  Box,
  FormControl,
  FormLabel,
  TextField,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import { FormInitialValuesType, subjects } from "./interfaces";
import * as Yup from "yup";
import Toaster from "utils/Toster";
import { getSchools as getSchoolAction } from "services/school";
import { ISchool } from "global/interfaces";

const SignUp: React.FC = () => {
  const [schools, setSchools] = useState<ISchool[]>([]);
  const [formInitialValues, setFormInitialValues] =
    useState<FormInitialValuesType>({
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      confirmPassword: "",
      school: "",
      subject: "",
    });

  const validationSchema = () => {
    return Yup.object({
      email: Yup.string().email().required("Email cannot be empty."),
      password: Yup.string()
        .matches(
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}/g
        )
        .required("Password cannot be empty."),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Password must match"
      ),
      first_name: Yup.string().required("First name cannot be empty."),
      last_name: Yup.string().required("Last name cannot be empty."),
      school: Yup.number().required("School cannot be empty."),
      subject: Yup.string().required("Subject cannot be empty."),
    });
  };

  const handleSubmit = (
    values: FormInitialValuesType,
    formikHelper: FormikHelpers<FormInitialValuesType>
  ) => {
    console.log(values);
  };

  useEffect(() => {
    getSchools();
  }, []);

  const getSchools = async () => {
    try {
      const { data }: { data: { responseData: ISchool[] } } =
        await getSchoolAction();
      setSchools(data.responseData);
    } catch (e: any) {
      Toaster("error", e.message);
    }
  };
  return (
    <Styled.SignUpContainer>
      <Styled.SignUpCard>
        <CardContent>
          <Typography variant={"h4"} className={"heading__text"}>
            Create a new account
          </Typography>
          <Formik
            initialValues={formInitialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({
              values,
              errors,
              handleChange,
              dirty,
              isValid,
              isSubmitting,
              handleBlur,
              touched,
              handleSubmit,
            }) => {
              return (
                <Form onSubmit={handleSubmit}>
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    gap={3}
                    mt={4}
                    px={4.7}
                  >
                    <Box
                      display={"flex"}
                      gap={3}
                      flexDirection={{ xs: "column", sm: "row" }}
                    >
                      <FormControl
                        required
                        error={!!errors.first_name && touched.first_name}
                      >
                        <FormLabel>First name</FormLabel>
                        <TextField
                          name={"first_name"}
                          value={values.first_name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          inputProps={{
                            sx: { color: "#fff" },
                          }}
                          placeholder={"Ej: Juanito"}
                          variant={"standard"}
                        />
                      </FormControl>
                      <FormControl
                        required
                        error={!!errors.last_name && touched.last_name}
                      >
                        <FormLabel>Last name</FormLabel>
                        <TextField
                          value={values.last_name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          type={"last_name"}
                          name="last_name"
                          inputProps={{
                            sx: { color: "#fff" },
                          }}
                          placeholder={"Ej: Pérez"}
                          variant={"standard"}
                        />
                      </FormControl>
                    </Box>
                    <FormControl
                      required
                      error={!!errors.email && touched.email}
                    >
                      <FormLabel>Email</FormLabel>
                      <TextField
                        name={"email"}
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type={"email"}
                        inputProps={{
                          sx: { color: "#fff" },
                        }}
                        placeholder={"Ej: juanito.perez@email.com"}
                        variant={"standard"}
                      />
                    </FormControl>
                    <FormControl
                      required
                      error={!!errors.password && touched.password}
                    >
                      <FormLabel>Password</FormLabel>
                      <TextField
                        name={"password"}
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        inputProps={{
                          sx: { color: "#fff" },
                        }}
                        type={"password"}
                        placeholder={"Ingresa tu contraseña"}
                        variant={"standard"}
                      />
                    </FormControl>

                    <FormControl
                      required
                      error={
                        !!errors.confirmPassword && touched.confirmPassword
                      }
                    >
                      <FormLabel>Confirm password</FormLabel>
                      <TextField
                        name={"confirmPassword"}
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        inputProps={{
                          sx: { color: "#fff" },
                        }}
                        type={"password"}
                        placeholder={"Ingresa tu contraseña"}
                        variant={"standard"}
                      />
                    </FormControl>

                    <FormControl error={!!errors.school && touched.school}>
                      <FormLabel>School</FormLabel>
                      <Select
                        size={"small"}
                        variant={"outlined"}
                        name={"school"}
                        value={values.school}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        inputProps={{
                          sx: { color: "#fff" },
                        }}
                        placeholder={"Select a school"}
                      >
                        <MenuItem value={""}>Select a school</MenuItem>
                        {schools.map((school, index) => {
                          return (
                            <MenuItem key={index} value={school.id}>
                              {school.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                    <FormControl
                      required
                      error={!!errors.subject && touched.subject}
                    >
                      <FormLabel>What school subject do you teach?</FormLabel>
                      <Select
                        size={"small"}
                        variant={"outlined"}
                        name={"subject"}
                        value={values.subject}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        inputProps={{
                          sx: { color: "#fff" },
                        }}
                        placeholder={"Select a subject"}
                      >
                        <MenuItem value={""}>Select a subject</MenuItem>
                        {subjects.map((subject, index) => {
                          return (
                            <MenuItem key={index} value={subject}>
                              {subject}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>

                    <Box
                      className={"action__container"}
                      display={"flex"}
                      flexDirection={"column"}
                      alignItems={"center"}
                      gap={1}
                    >
                      <Button
                        disabled={isSubmitting || !isValid || !dirty}
                        fullWidth
                        className={"login__button"}
                        variant={"contained"}
                        type={"submit"}
                      >
                        Create account
                      </Button>
                    </Box>
                  </Box>
                </Form>
              );
            }}
          </Formik>
        </CardContent>
      </Styled.SignUpCard>
    </Styled.SignUpContainer>
  );
};

export default SignUp;

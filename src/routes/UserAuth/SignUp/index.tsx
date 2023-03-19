import React, { useEffect, useState } from "react";
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
  InputLabel,
} from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import { FormInitialValuesType, subjects } from "./interfaces";
import * as Yup from "yup";
import Toaster from "utils/Toster";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { getSchools as getSchoolAction } from "services/school";
import { ISchool } from "global/interfaces";
import { signUp } from "../../../services/auth";
import { AxiosError } from "axios";
import { SignUpContainer, SignUpCard } from "./styled";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

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
      school: Yup.number(),
      subject: Yup.string(),
    });
  };

  const handleSubmit = async (
    values: FormInitialValuesType,
    formikHelper: FormikHelpers<FormInitialValuesType>
  ) => {
    try {
      delete values.confirmPassword;
      await signUp(values);
      Toaster("success", "You will get a verification email!");
      formikHelper.resetForm();
    } catch (e: any) {
      if (e instanceof AxiosError) {
        const {
          data: { responseData },
        } = e.response;
        if (
          responseData.client === "postgres" &&
          responseData?.constraint === "user_email_unique"
        ) {
          Toaster("error", "Email already exists");
          formikHelper.setFieldError("email", "Email already exists");
        }
      }
      Toaster("error", e.message);
    } finally {
      formikHelper.setSubmitting(false);
    }
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
    <SignUpContainer className="d-flex flex-column">
      <SignUpCard variant="outlined">
        <CardContent className="px-5 pt-5">
          <Button className="mb-2" startIcon={<ArrowBackIosIcon fontSize="small" />} component={RouterLink} to={"/signin"}>Volver</Button>
          <Typography component="h4" variant="h5" textAlign="center">
            Crea una nueva cuenta en Kodkod
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
                    gap={2}
                    mt={3}
                  >
                    <Box
                      display={"flex"}
                      gap={2}
                      flexDirection={{ xs: "column", sm: "row" }}
                    >
                      <FormControl
                        required
                        error={!!errors.first_name && touched.first_name}
                      >                        
                        <TextField             
                          required             
                          name={"first_name"}
                          value={values.first_name}
                          onChange={handleChange}
                          onBlur={handleBlur}                          
                          placeholder={"Ej: Juan Andrés"}
                          label="Nombre"
                          variant="outlined"
                        />
                      </FormControl>
                      <FormControl
                        required
                        error={!!errors.last_name && touched.last_name}
                      >                        
                        <TextField
                          required
                          value={values.last_name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          type={"last_name"}
                          name="last_name"                          
                          placeholder={"Ej: Gómez Pérez"}
                          label="Apellido"
                          variant="outlined"
                        />
                      </FormControl>
                    </Box>
                    <FormControl
                      required
                      error={!!errors.email && touched.email}
                    >                      
                      <TextField
                        name={"email"}
                        value={values.email}
                        required
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type={"email"}
                        placeholder={"Ej: juanito.perez@email.com"}
                        label="Email"
                        variant="outlined"
                      />
                    </FormControl>
                    <FormControl
                      required
                      error={!!errors.password && touched.password}
                    >                      
                      <TextField
                        required
                        name={"password"}
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}                        
                        type={"password"}
                        placeholder={"Crea una contraseña para tu cuenta"}
                        label="Contraseña"
                        variant="outlined"
                      />
                    </FormControl>

                    <FormControl
                      required
                      error={
                        !!errors.confirmPassword && touched.confirmPassword
                      }
                    >                      
                      <TextField
                        required
                        name={"confirmPassword"}
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}                        
                        type={"password"}
                        placeholder={"¡Para estar seguros!"}
                        label="Repite tu contraseña"
                        variant="outlined"
                      />
                    </FormControl>

                    <FormControl>                      
                      <InputLabel id="school-label">Establecimiento educacional (opcional)</InputLabel>
                      <Select                    
                        labelId="school-label"
                        variant={"outlined"}                        
                        name={"school"}
                        value={values.school}
                        onChange={handleChange}
                        onBlur={handleBlur}    
                        label="Establecimiento educacional (opcional)"
                      >
                        <MenuItem value={""} disabled>Escoge un colegio</MenuItem>
                        {schools.map((school, index) => {
                          return (
                            <MenuItem key={index} value={school.id}>
                              {school.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                    <FormControl>
                      <InputLabel id="subject-label">¿Qué asignatura enseñas? (opcional)</InputLabel>
                      <Select           
                        labelId="subject-label"          
                        variant={"outlined"}
                        name={"subject"}
                        value={values.subject}
                        onChange={handleChange}
                        onBlur={handleBlur}                        
                        label="¿Qué asignatura enseñas? (opcional)"
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
                        size="large"
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
      </SignUpCard>
    </SignUpContainer>
  );
};

export default SignUp;

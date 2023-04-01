import React, { useEffect, useState } from "react";
import {
  Typography,
  CardContent,
  Box,
  FormControl,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Link as RouterLink } from "react-router-dom";
import { AxiosError } from "axios";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { FormInitialValuesType, subjects } from "./interfaces";
import Toaster from "utils/Toster";
import { getSchools as getSchoolAction } from "services/school";
import { ISchool } from "global/interfaces";
import { signUp } from "../../../services/auth";
import { SignUpContainer, SignUpCard } from "./styled";
import { FetchStatus } from "global/enums";
import AuthCard from "components/AuthCard";

const SignUp: React.FC = () => {
  const [schools, setSchools] = useState<ISchool[]>([]);
  const [formInitialValues] = useState<FormInitialValuesType>({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    confirmPassword: "",
    school: "",
    subject: "",
  });
  const [isFetching, setIsFetching] = useState(FetchStatus.Idle);

  const validationSchema = () => {
    return Yup.object({
      email: Yup.string().email().required("Email cannot be empty."),
      password: Yup.string()
        .matches(
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}/g
        )
        .required("Password cannot be empty."),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Password must match")
        .required("Password cannot be empty."),
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
    setIsFetching(FetchStatus.Pending);
    const filteredValues: Omit<FormInitialValuesType, "confirmPassword"> = {
      email: values.email,
      password: values.password,
      first_name: values.first_name,
      last_name: values.last_name,
      school: values.school,
      subject: values.subject,
    };
    signUp(filteredValues)
      .then((_response) => {
        Toaster("success", "You will get a verification email!");
        formikHelper.resetForm();
        setIsFetching(FetchStatus.Success);
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          const {
            data: { responseData },
          } = error.response;
          if (
            responseData.client === "postgres" &&
            responseData?.constraint === "user_email_unique"
          ) {
            Toaster("error", "Email already exists");
            formikHelper.setFieldError("email", "Email already exists");
          }
        }
        console.error(error);
        Toaster("error", error.message);
        setIsFetching(FetchStatus.Error);
      })
      .finally(() => {
        formikHelper.setSubmitting(false);
      });
    // try {
    //   delete values.confirmPassword;
    //   await signUp(values);
    //   Toaster("success", "You will get a verification email!");
    //   formikHelper.resetForm();
    // } catch (e: any) {
    //   if (e instanceof AxiosError) {
    //     const {
    //       data: { responseData },
    //     } = e.response;
    //     if (
    //       responseData.client === "postgres" &&
    //       responseData?.constraint === "user_email_unique"
    //     ) {
    //       Toaster("error", "Email already exists");
    //       formikHelper.setFieldError("email", "Email already exists");
    //     }
    //   }
    //   Toaster("error", e.message);
    // } finally {
    //   formikHelper.setSubmitting(false);
    // }
  };

  const getSchools = async () => {
    try {
      const { data }: { data: { responseData: ISchool[] } } =
        await getSchoolAction();
      setSchools(data.responseData);
    } catch (e: any) {
      Toaster("error", e.message);
    }
  };

  useEffect(() => {
    getSchools();
  }, []);

  if (isFetching === FetchStatus.Success)
    return (
      <SignUpContainer className="d-flex flex-column">
        <AuthCard>
          <Button
            className="mb-2"
            startIcon={<ArrowBackIosIcon />}
            component={RouterLink}
            to={"/signin"}
          >
            Volver al inicio de sesión
          </Button>
          <Typography component="h4" variant="h5" className="mb-1">
            Cuenta creada con éxito
          </Typography>
          <Typography component="span" variant="body2" color="gray">
            Te hemos enviado un correo electrónico para verificar tu email.
          </Typography>
        </AuthCard>
      </SignUpContainer>
    );

  if (isFetching === FetchStatus.Error)
    return (
      <SignUpContainer className="d-flex flex-column">
        <AuthCard>
          <Button
            className="mb-2"
            startIcon={<ArrowBackIosIcon />}
            component={RouterLink}
            to={"/signin"}
          >
            Volver al inicio de sesión
          </Button>
          <Typography component="h4" variant="h5" className="mb-1">
            Ha ocurrido un error
          </Typography>
          <Typography component="span" variant="body2" color="gray">
            Por favor, inténtalo de nuevo.
          </Typography>
        </AuthCard>
      </SignUpContainer>
    );

  return (
    <SignUpContainer className="d-flex flex-column">
      <SignUpCard variant="outlined">
        <CardContent className="px-5 pt-5">
          <Button
            className="mb-2"
            startIcon={<ArrowBackIosIcon />}
            component={RouterLink}
            to={"/signin"}
          >
            Volver al inicio de sesión
          </Button>
          <Typography component="h4" variant="h5" className="mb-1">
            Crea una nueva cuenta en Kodkod
          </Typography>
          <Typography component="span" variant="body2" color="gray">
            Tu contraseña debe contener:
          </Typography>
          <ul>
            <Typography component="li" variant="body2" color="gray">
              Al menos 8 caractéres
            </Typography>
            <Typography component="li" variant="body2" color="gray">
              Al menos 1 minúscula
            </Typography>
            <Typography component="li" variant="body2" color="gray">
              Al menos 1 mayúscula
            </Typography>
            <Typography component="li" variant="body2" color="gray">
              Al menos 1 número
            </Typography>
            <Typography component="li" variant="body2" color="gray">
              Al menos 1 símbolo
            </Typography>
          </ul>
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
                  <Box display={"flex"} flexDirection={"column"} gap={2} mt={3}>
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
                      <InputLabel id="school-label">
                        Establecimiento educacional (opcional)
                      </InputLabel>
                      <Select
                        labelId="school-label"
                        variant={"outlined"}
                        name={"school"}
                        value={values.school}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label="Establecimiento educacional (opcional)"
                      >
                        <MenuItem value={""} disabled>
                          Escoge un colegio
                        </MenuItem>
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
                      <InputLabel id="subject-label">
                        ¿Qué asignatura enseñas? (opcional)
                      </InputLabel>
                      <Select
                        labelId="subject-label"
                        variant={"outlined"}
                        name={"subject"}
                        value={values.subject}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label="¿Qué asignatura enseñas? (opcional)"
                      >
                        <MenuItem disabled value={""}>
                          Escoge una asignatura
                        </MenuItem>
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
                        Crear cuenta
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

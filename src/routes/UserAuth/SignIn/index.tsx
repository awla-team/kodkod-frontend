import React, { useState } from "react";
import { SignInCard, SignInContainer } from "./styled";
import {
  Box,
  Typography,
  FormControl,
  TextField,
  Button,
  CardContent,
  CardMedia,
} from "@mui/material";
import logoWhite from "assets/images/logo-white.png";
import { Formik, Form, FormikHelpers } from "formik";
import { FormInitialValuesType } from "./interfaces";
import * as Yup from "yup";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { signIn } from "services/auth";
import Toaster from "utils/Toster";
import { SignInResponseType } from "../../../global/interfaces";

const SignIn: React.FC = () => {
  const [formInitialValues] = useState<FormInitialValuesType>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const validationSchema = () => {
    return Yup.object({
      email: Yup.string().email().required("Email cannot be empty."),
      password: Yup.string().required("Password cannot be empty."),
    });
  };

  const handleSubmit = async (
    values: FormInitialValuesType,
    formikHelper: FormikHelpers<FormInitialValuesType>
  ) => {
    try {
      const {
        data: { responseData },
      }: { data: { responseData: SignInResponseType } } = await signIn(values);
      const { refreshToken, accessToken } = responseData;
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("accessToken", accessToken);
      navigate("/app");
    } catch (error: any) {
      if (error?.response?.data?.responseData === "Wrong credentials")
        return Toaster("error", "Email o contraseña incorrecta");
      if (error?.response?.data?.responseData?.reason === "unverified")
        return Toaster(
          "error",
          "El email de esta cuenta no ha sido verificado"
        );
      Toaster("error", "Hubo un error al iniciar sesión");
    } finally {
      formikHelper.setSubmitting(false);
    }
  };
  return (
    <SignInContainer className="d-flex flex-column">
      <SignInCard variant="outlined">
        <div>
          <CardMedia
            className="p-5"
            component="img"
            image={logoWhite}
            alt="kodkod logo"
          />
        </div>
        <CardContent className="px-5 py-4">
          <Typography component="h4" variant="h5" textAlign="center">
            Ingresa a tu cuenta
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
                  <Box display={"flex"} flexDirection={"column"} mt={3}>
                    <FormControl
                      error={!!errors.email && touched.email}
                      className="mb-3"
                    >
                      <TextField
                        name={"email"}
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type={"email"}
                        color="primary"
                        placeholder={"Ingresa tu email"}
                        variant="outlined"
                      />
                    </FormControl>
                    <FormControl
                      error={!!errors.password && touched.password}
                      className="mb-2"
                    >
                      <TextField
                        name={"password"}
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        color="primary"
                        type={"password"}
                        placeholder={"Ingresa tu contraseña"}
                        variant="outlined"
                      />
                    </FormControl>
                    <Typography
                      className="mb-4"
                      textAlign={"center"}
                      variant="subtitle2"
                      component={RouterLink}
                      to={"/forgot-password"}
                    >
                      Olvidé mi contraseña
                    </Typography>

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
                        Iniciar sesión
                      </Button>
                      <Typography component="span" variant="subtitle2">
                        ¿Aún no tienes una cuenta?{" "}
                        <Typography
                          component={RouterLink}
                          variant="subtitle2"
                          to={"/signup"}
                        >
                          Registrate
                        </Typography>
                      </Typography>
                    </Box>
                  </Box>
                </Form>
              );
            }}
          </Formik>
        </CardContent>
      </SignInCard>
    </SignInContainer>
  );
};

export default SignIn;

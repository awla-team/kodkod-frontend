import React, { useState } from "react";
import * as Styled from "./styled";
import {
  Box,
  CardContent,
  FormLabel,
  Typography,
  FormControl,
  TextField,
  Button,
} from "@mui/material";

import { Formik, Form, FormikHelpers } from "formik";
import { FormInitialValuesType } from "./interfaces";
import * as Yup from "yup";
import { Link as RouterLink } from "react-router-dom";

const SignIn: React.FC = () => {
  const [formInitialValues, setFormInitialValues] =
    useState<FormInitialValuesType>({
      email: "",
      password: "",
    });

  const validationSchema = () => {
    return Yup.object({
      email: Yup.string().email().required("Email cannot be empty."),
      password: Yup.string().required("Password cannot be empty."),
    });
  };

  const handleSubmit = (
    values: FormInitialValuesType,
    formikHelper: FormikHelpers<FormInitialValuesType>
  ) => {
    console.log(values);
  };
  return (
    <Styled.SignInContainer>
      <Styled.SignInCard>
        <CardContent>
          <Typography variant={"h4"} className={"heading__text"}>
            Log in to your account
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
                    <FormControl error={!!errors.email && touched.email}>
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
                    <FormControl error={!!errors.password && touched.password}>
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
                    <Typography
                      className={"forget__password"}
                      textAlign={"center"}
                      color={"#fff"}
                      variant={"subtitle2"}
                      component={RouterLink}
                      to={"/forget-password"}
                    >
                      Forget my password
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
                        className={"login__button"}
                        variant={"contained"}
                        type={"submit"}
                      >
                        Log in
                      </Button>
                      <Button
                        fullWidth
                        className={"create__account__button"}
                        variant={"outlined"}
                      >
                        Create a new account
                      </Button>
                    </Box>
                  </Box>
                </Form>
              );
            }}
          </Formik>
        </CardContent>
      </Styled.SignInCard>
    </Styled.SignInContainer>
  );
};

export default SignIn;

import React, { FC, useState } from "react";
import * as Styled from "./styled";
import {
  Box,
  Button,
  CardContent,
  FormControl,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { FormInitialValuesType } from "./interfaces";
import * as Yup from "yup";
import Toaster from "utils/Toster";

const ResetPassword: FC = () => {
  const [formInitialValues, setFormInitialValues] =
    useState<FormInitialValuesType>({
      confirmPassword: "",
      password: "",
    });
  const navigate = useNavigate();

  const validationSchema = () => {
    return Yup.object({
      password: Yup.string()
        .matches(
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}/g
        )
        .required("Password cannot be empty."),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Password must match"
      ),
    });
  };

  const handleSubmit = async (
    values: FormInitialValuesType,
    formikHelper: FormikHelpers<FormInitialValuesType>
  ) => {
    try {
    } catch (error: any) {
      Toaster("error", error.message);
    } finally {
      formikHelper.setSubmitting(false);
    }
  };
  return (
    <Styled.ResetPasswordContainer>
      <Styled.ResetPasswordCard>
        <CardContent>
          <Typography variant={"h4"} className={"heading__text"}>
            Choose a new password
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
                    <FormControl
                      required
                      error={!!errors.password && touched.password}
                    >
                      <FormLabel>New password</FormLabel>
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
                      <FormLabel>Confirm new password</FormLabel>
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
                        className={"submit__button"}
                        variant={"contained"}
                        type={"submit"}
                      >
                        Set new password
                      </Button>
                      <Button
                        component={RouterLink}
                        to={"/signin"}
                        fullWidth
                        className={"login__button"}
                        variant={"outlined"}
                      >
                        Go to login
                      </Button>
                    </Box>
                  </Box>
                </Form>
              );
            }}
          </Formik>
        </CardContent>
      </Styled.ResetPasswordCard>
    </Styled.ResetPasswordContainer>
  );
};

export default ResetPassword;

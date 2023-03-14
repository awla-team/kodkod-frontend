import { ForgotPasswordProps } from "./interfaces";
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
import { forgotPassword } from "services/auth";

const ForgotPassword: FC<ForgotPasswordProps> = () => {
  const [formInitialValues, setFormInitialValues] =
    useState<FormInitialValuesType>({
      email: "",
    });
  const navigate = useNavigate();

  const validationSchema = () => {
    return Yup.object({
      email: Yup.string().email().required("Email cannot be empty."),
    });
  };

  const handleSubmit = async (
    values: FormInitialValuesType,
    formikHelper: FormikHelpers<FormInitialValuesType>
  ) => {
    try {
      await forgotPassword(values);
      Toaster("success", "Email has been sent to your email address");
      formikHelper.resetForm();
    } catch (error: any) {
      Toaster("error", error.message);
    } finally {
      formikHelper.setSubmitting(false);
    }
  };
  return (
    <Styled.ForgotPasswordContainer>
      <Styled.ForgotPasswordCard>
        <CardContent>
          <Typography variant={"h4"} className={"heading__text"}>
            Recover your password
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
                        Send recovery email
                      </Button>
                      <Button
                        component={RouterLink}
                        to={"/signin"}
                        fullWidth
                        className={"back__button"}
                        variant={"outlined"}
                      >
                        Back
                      </Button>
                    </Box>
                  </Box>
                </Form>
              );
            }}
          </Formik>
        </CardContent>
      </Styled.ForgotPasswordCard>
    </Styled.ForgotPasswordContainer>
  );
};

export default ForgotPassword;

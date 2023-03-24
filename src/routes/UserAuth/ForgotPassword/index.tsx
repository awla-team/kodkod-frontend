import { ForgotPasswordProps } from "./interfaces";
import React, { FC, useState } from "react";
import { ForgotPasswordCard, ForgotPasswordContainer } from "./styled";
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
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

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
    <ForgotPasswordContainer className="d-flex flex-column">
      <ForgotPasswordCard variant="outlined">
        <CardContent className="p-5">
          <Button className="mb-2" startIcon={<ArrowBackIosIcon fontSize="small" />} component={RouterLink} to={"/signin"}>Volver</Button>
          <Typography component="h4" variant="h5" className="mb-1">
            Recupera tu contraseña
          </Typography>
          <Typography component="span" variant="body2" color="gray" width="200px">
            Ingresa tu email para enviarte un correo con instrucciones para recuperar tu contraseña
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
                    mt={2 }                    
                  >
                    <FormControl error={!!errors.email && touched.email}>                    
                      <TextField
                        name={"email"}
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type={"email"}
                        label="Email"
                        placeholder={"Ej: juanito.perez@email.com"}
                        variant="outlined"
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
                        size="large"
                        className={"submit__button"}
                        variant={"contained"}
                        type={"submit"}
                      >
                        Enviar correo de recuperación
                      </Button>                      
                    </Box>
                  </Box>
                </Form>
              );
            }}
          </Formik>
        </CardContent>
      </ForgotPasswordCard>
    </ForgotPasswordContainer>
  );
};

export default ForgotPassword;

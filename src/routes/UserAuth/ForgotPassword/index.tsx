import {
  type ForgotPasswordProps,
  type FormInitialValuesType,
} from './interfaces';
import React, { type FC, useState } from 'react';
import { ForgotPasswordCard } from './styled';
import {
  Box,
  Button,
  CardContent,
  FormControl,
  TextField,
  Typography,
} from '@mui/material';
import { Form, Formik, type FormikHelpers } from 'formik';
import { Link as RouterLink } from 'react-router-dom';
import * as Yup from 'yup';
import Toaster from 'utils/Toster';
import { forgotPassword } from 'services/auth';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const ForgotPassword: FC<ForgotPasswordProps> = () => {
  const [formInitialValues] = useState<FormInitialValuesType>({
    email: '',
  });

  const validationSchema = () => {
    return Yup.object({
      email: Yup.string().email().required('Email cannot be empty.'),
    });
  };

  const handleSubmit = async (
    values: FormInitialValuesType,
    formikHelper: FormikHelpers<FormInitialValuesType>
  ) => {
    try {
      await forgotPassword(values);
      Toaster('success', 'El correo ha sido enviado a tu email');
      formikHelper.resetForm();
    } catch (error: any) {
      if (error?.response?.data?.responseData === 'Data not found')
        return Toaster(
          'error',
          'El email ingresado no se encuentra registrado'
        );
      if (
        error?.response?.data?.responseData?.includes?.('must be a valid email')
      )
        return Toaster('error', 'El email ingresado no es válido');
      if (error?.response?.data?.responseData?.reason === 'unverified')
        return Toaster(
          'error',
          'El email de esta cuenta no ha sido verificado'
        );
      Toaster('error', 'Hubo un error al enviar el correo');
    } finally {
      formikHelper.setSubmitting(false);
    }
  };

  return (
    <ForgotPasswordCard variant='outlined'>
      <CardContent className='p-5'>
        <Button
          className='mb-2'
          startIcon={<ArrowBackIosIcon />}
          component={RouterLink}
          to='/signin'
        >
          Volver al inicio de sesión
        </Button>
        <Typography component='h4' variant='h5' className='mb-1'>
          Recupera tu contraseña
        </Typography>
        <Typography component='span' variant='body2' color='gray'>
          Ingresa tu email para enviarte un correo con instrucciones para
          recuperar tu contraseña
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
                <Box display='flex' flexDirection='column' gap={2} mt={2}>
                  <FormControl error={!!errors.email && touched.email}>
                    <TextField
                      required
                      name='email'
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type='email'
                      label='Email'
                      placeholder='Ej: juanito.perez@email.com'
                      variant='outlined'
                    />
                  </FormControl>

                  <Box
                    className='action__container'
                    display='flex'
                    flexDirection='column'
                    alignItems='center'
                    gap={1}
                  >
                    <Button
                      disabled={isSubmitting || !isValid || !dirty}
                      fullWidth
                      size='large'
                      className='submit__button'
                      variant='contained'
                      type='submit'
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
  );
};

export default ForgotPassword;

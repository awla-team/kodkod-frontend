import React, { type FC, useEffect, useState } from 'react';
import { ResetPasswordCard } from './styled';
import {
  Box,
  Button,
  CardContent,
  FormControl,
  TextField,
  Typography,
} from '@mui/material';
import { Form, Formik, type FormikHelpers } from 'formik';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { type FormInitialValuesType } from './interfaces';
import * as Yup from 'yup';
import Toaster from 'utils/Toster';
import { resetPassword, verifyResetToken } from 'services/auth';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const ResetPassword: FC = () => {
  const [valid, setValid] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [formInitialValues] = useState<FormInitialValuesType>({
    confirmPassword: '',
    password: '',
  });
  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {
    if (token) {
      handleVerifyToken();
    }
  }, [token]);

  const handleVerifyToken = async () => {
    try {
      setLoading(true);
      const {
        data: { responseData },
      }: { data: { responseData: string } } = await verifyResetToken(token);
      if (responseData !== 'valid token') {
        setValid(false);
      }
    } catch (e: any) {
      setValid(false);
      Toaster('error', 'Link no valido o expirado');
    } finally {
      setLoading(false);
    }
  };

  const validationSchema = () => {
    return Yup.object({
      password: Yup.string()
        .matches(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/g)
        .required('Password cannot be empty.'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Password must match')
        .required('Password cannot be empty'),
    });
  };

  const handleSubmit = async (
    values: FormInitialValuesType,
    formikHelper: FormikHelpers<FormInitialValuesType>
  ) => {
    try {
      delete values.confirmPassword;
      const { data }: { data: { responseData: string } } = await resetPassword(
        values,
        token
      );
      // Toaster("success", data.responseData);
      Toaster('success', 'Contraseña actualizada exitosamente');
      navigate('/signin');
    } catch (error: any) {
      console.error(error);
      Toaster('error', 'Hubo un error al actualizar la contraseña');
    } finally {
      formikHelper.setSubmitting(false);
    }
  };
  return (
    <ResetPasswordCard variant='outlined'>
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
          Crea una nueva contraseña
        </Typography>
        <Typography component='span' variant='body2' color='gray'>
          Tu nueva contraseña debe contener:
        </Typography>
        <ul>
          <Typography component='li' variant='body2' color='gray'>
            Entre 8 y 16 caractéres
          </Typography>
          <Typography component='li' variant='body2' color='gray'>
            Al menos 1 minúscula
          </Typography>
          <Typography component='li' variant='body2' color='gray'>
            Al menos 1 mayúscula
          </Typography>
          <Typography component='li' variant='body2' color='gray'>
            Al menos 1 número
          </Typography>
        </ul>
        {valid ? (
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
                  <Box display='flex' flexDirection='column' gap={2} mt={3}>
                    <FormControl
                      required
                      error={!!errors.password && touched.password}
                    >
                      <TextField
                        name='password'
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type='password'
                        label='Nueva contraseña'
                        placeholder='Ingresa tu nueva contraseña'
                        variant='outlined'
                      />
                    </FormControl>

                    <FormControl
                      required
                      error={
                        !!errors.confirmPassword && touched.confirmPassword
                      }
                    >
                      <TextField
                        name='confirmPassword'
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type='password'
                        label='Confirma tu nueva contraseña'
                        placeholder='Ingresa tu nueva contraseña una vez más'
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
                        disabled={isSubmitting || !isValid || !dirty || loading}
                        fullWidth
                        className='submit__button'
                        variant='contained'
                        type='submit'
                        size='large'
                      >
                        Establecer nueva contraseña
                      </Button>
                    </Box>
                  </Box>
                </Form>
              );
            }}
          </Formik>
        ) : (
          <Typography
            variant='h5'
            color='error'
            className='invalid__token__text'
          >
            Link no valido o expirado
          </Typography>
        )}
      </CardContent>
    </ResetPasswordCard>
  );
};

export default ResetPassword;

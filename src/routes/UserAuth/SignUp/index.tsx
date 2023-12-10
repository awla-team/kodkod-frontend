import React, { useEffect, useState } from 'react';
import {
  Typography,
  CardContent,
  Box,
  FormControl,
  TextField,
  Button,
  Autocomplete,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Form, Formik, type FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Link as RouterLink } from 'react-router-dom';
import { AxiosError } from 'axios';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { type FormInitialValuesType, subjects } from './interfaces';
import Toaster from 'utils/Toster';
import { getSchools as getSchoolAction } from 'services/school';
import { type ISchool } from 'global/interfaces';
import { signUp } from '../../../services/auth';
import { SignUpCard } from './styled';
import { FetchStatus } from 'global/enums';
import AuthCard from 'components/AuthCard';
import { VisibilityOff, Visibility } from '@mui/icons-material';

const SignUp: React.FC = () => {
  const [schools, setSchools] = useState<ISchool[]>([]);
  const [formInitialValues] = useState<FormInitialValuesType>({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    confirmPassword: '',
    school: '',
    subject: '',
    terms_and_conditions: false,
    privacy_policy: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isFetching, setIsFetching] = useState(FetchStatus.Idle);

  const validationSchema = () => {
    return Yup.object({
      email: Yup.string().email().required('Email cannot be empty.'),
      password: Yup.string()
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$|^$/g)
        .required('Password cannot be empty.'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Password must match')
        .required('Password cannot be empty.'),
      first_name: Yup.string().required('First name cannot be empty.'),
      last_name: Yup.string().required('Last name cannot be empty.'),
      school: Yup.number(),
      subject: Yup.string(),
      terms_and_conditions: Yup.boolean()
        .required(
          'Debes aceptar los términos y condiciones para crear una cuenta.'
        )
        .oneOf(
          [true],
          'Debes aceptar los términos y condiciones para crear una cuenta.'
        ),
      privacy_policy: Yup.boolean()
        .required(
          'Debes aceptar la política de privacidad para crear una cuenta.'
        )
        .oneOf(
          [true],
          'Debes aceptar la política de privacidad para crear una cuenta.'
        ),
    });
  };

  const handleSubmit = async (
    values: FormInitialValuesType,
    formikHelper: FormikHelpers<FormInitialValuesType>
  ) => {
    setIsFetching(FetchStatus.Pending);
    const filteredValues: FormInitialValuesType = {
      email: values.email,
      password: values.password,
      first_name: values.first_name,
      last_name: values.last_name,
      school: values.school,
      subject: values.subject,
    };
    signUp(filteredValues)
      .then((_response) => {
        formikHelper.resetForm();
        setIsFetching(FetchStatus.Success);
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          const {
            data: { responseData },
          } = error.response;
          if (
            responseData.client === 'postgres' &&
            responseData?.constraint === 'user_email_unique'
          ) {
            Toaster('error', 'Email already exists');
            formikHelper.setFieldError('email', 'Email already exists');
          }
        }
        Toaster(
          'error',
          error.response.data.responseData.message || error.message
        );
        setIsFetching(FetchStatus.Error);
      })
      .finally(() => {
        formikHelper.setSubmitting(false);
      });
  };

  const getSchools = async () => {
    try {
      const { data }: { data: { responseData: ISchool[] } } =
        await getSchoolAction();
      setSchools(data.responseData);
    } catch (e: any) {
      Toaster('error', e.message);
    }
  };

  useEffect(() => {
    getSchools();
  }, []);

  if (isFetching === FetchStatus.Success)
    return (
      <AuthCard>
        <Button
          className='mb-2'
          startIcon={<ArrowBackIosIcon />}
          component={RouterLink}
          to='/signin'
        >
          Volver al inicio de sesión
        </Button>
        <Typography component='h4' variant='h5' className='mb-1'>
          Cuenta creada con éxito
        </Typography>
        <Typography component='span' variant='body2' color='gray'>
          Te hemos enviado un correo electrónico para verificar tu email.
        </Typography>
      </AuthCard>
    );

  /* if (isFetching === FetchStatus.Error)
    return (
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
    ); */

  console.log(showPassword);
  return (
    <SignUpCard variant='outlined'>
      <CardContent className='px-5 pt-5'>
        <Button
          className='mb-2'
          startIcon={<ArrowBackIosIcon />}
          component={RouterLink}
          to='/signin'
        >
          Volver al inicio de sesión
        </Button>
        <Typography component='h4' variant='h5' className='mb-1'>
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
            setFieldValue,
          }) => {
            return (
              <Form onSubmit={handleSubmit}>
                <Box display='flex' flexDirection='column' gap={2} mt={3}>
                  <Box
                    display='flex'
                    gap={2}
                    flexDirection={{ xs: 'column', sm: 'row' }}
                  >
                    <FormControl
                      required
                      error={!!errors.first_name && touched.first_name}
                    >
                      <TextField
                        required
                        name='first_name'
                        value={values.first_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder='Ej: Juan Andrés'
                        label='Nombre'
                        variant='outlined'
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
                        type='last_name'
                        name='last_name'
                        placeholder='Ej: Gómez Pérez'
                        label='Apellido'
                        variant='outlined'
                      />
                    </FormControl>
                  </Box>
                  <FormControl required error={!!errors.email && touched.email}>
                    <TextField
                      name='email'
                      value={values.email}
                      required
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type='email'
                      placeholder='Ej: juanito.perez@email.com'
                      label='Email'
                      variant='outlined'
                    />
                  </FormControl>
                  <FormControl
                    required
                    error={!!errors.password && touched.password}
                  >
                    <TextField
                      required
                      name='password'
                      value={values.password}
                      error={
                        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$|^$/.test(
                          values.password
                        )
                      }
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type={showPassword ? 'text' : 'password'}
                      placeholder='Crea una contraseña para tu cuenta'
                      label='Contraseña'
                      variant='outlined'
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              aria-label='toggle password visibility'
                              onClick={() => setShowPassword((prev) => !prev)}
                              edge='end'
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <FormHelperText component='div' className='mx-0 mt-2'>
                      <ul className='m-0'>
                        <Typography
                          component='li'
                          variant='body2'
                          color={
                            /^.{8,16}$/.test(values.password)
                              ? '#009900'
                              : 'gray'
                          }
                          fontWeight={
                            /^.{8,16}$/.test(values.password)
                              ? 'bold'
                              : 'normal'
                          }
                        >
                          Entre 8 y 16 caractéres
                        </Typography>
                        <Typography
                          component='li'
                          variant='body2'
                          color={
                            /[a-z]/.test(values.password) ? '#009900' : 'gray'
                          }
                          fontWeight={
                            /[a-z]/.test(values.password) ? 'bold' : 'normal'
                          }
                        >
                          Al menos 1 minúscula
                        </Typography>
                        <Typography
                          component='li'
                          variant='body2'
                          color={
                            /[A-Z]/.test(values.password) ? '#009900' : 'gray'
                          }
                          fontWeight={
                            /[A-Z]/.test(values.password) ? 'bold' : 'normal'
                          }
                        >
                          Al menos 1 mayúscula
                        </Typography>
                        <Typography
                          component='li'
                          variant='body2'
                          color={
                            /\d/.test(values.password) ? '#009900' : 'gray'
                          }
                          fontWeight={
                            /\d/.test(values.password) ? 'bold' : 'normal'
                          }
                        >
                          Al menos 1 número
                        </Typography>
                      </ul>
                    </FormHelperText>
                  </FormControl>
                  <FormControl
                    required
                    error={!!errors.confirmPassword && touched.confirmPassword}
                  >
                    <TextField
                      required
                      name='confirmPassword'
                      value={values.confirmPassword}
                      error={values.confirmPassword !== values.password}
                      helperText={
                        values.confirmPassword !== values.password
                          ? 'Las contraseñas no coinciden'
                          : null
                      }
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type={showPassword ? 'text' : 'password'}
                      placeholder='¡Para estar seguros!'
                      label='Repite tu contraseña'
                      variant='outlined'
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              aria-label='toggle password visibility'
                              onClick={() => setShowPassword((prev) => !prev)}
                              edge='end'
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                  <FormControl>
                    <Autocomplete
                      id='school'
                      options={schools}
                      getOptionLabel={(school) =>
                        school?.commune
                          ? `${school.name} (${school.commune})`
                          : school.name
                      }
                      renderOption={(props, school) => (
                        <li {...props} key={`school-${school.id}`}>
                          {school?.commune
                            ? `${school.name} (${school.commune})`
                            : school.name}
                        </li>
                      )}
                      isOptionEqualToValue={(
                        option: ISchool,
                        value: ISchool
                      ) => {
                        return option.id === value.id;
                      }}
                      noOptionsText='No se encuentra el establecimiento'
                      onChange={(_event, value) => {
                        setFieldValue(
                          'school',
                          value ? value.id : formInitialValues.school
                        );
                      }}
                      renderInput={(params) => (
                        <TextField
                          label='Establecimiento educacional (opcional)'
                          name='school'
                          {...params}
                        />
                      )}
                    />
                  </FormControl>
                  <FormControl>
                    <Autocomplete
                      id='subject'
                      options={subjects}
                      getOptionLabel={(subject) => subject}
                      noOptionsText='No se encuentra la asignatura'
                      onChange={(_event, value) => {
                        setFieldValue(
                          'subject',
                          value || formInitialValues.subject
                        );
                      }}
                      renderInput={(params) => (
                        <TextField
                          label='¿Qué asignatura enseñas? (opcional)'
                          name='subject'
                          {...params}
                        />
                      )}
                    />
                  </FormControl>
                  <div>
                    <FormControlLabel
                      className='justify-content-center m-0'
                      control={
                        <Checkbox
                          size='small'
                          name='terms_and_conditions'
                          onChange={(_event, value) =>
                            setFieldValue('terms_and_conditions', value)
                          }
                          checked={values.terms_and_conditions}
                        />
                      }
                      label={
                        <Typography variant='body2'>
                          He leído y acepto los{' '}
                          <a
                            target='_blank'
                            rel='noreferrer'
                            href='https://kodkod.cl/terminos-y-condiciones'
                          >
                            términos y condiciones
                          </a>{' '}
                          de uso.
                        </Typography>
                      }
                    />
                    <FormControlLabel
                      className='justify-content-center m-0'
                      control={
                        <Checkbox
                          size='small'
                          name='privacy_policy'
                          onChange={(_event, value) =>
                            setFieldValue('privacy_policy', value)
                          }
                          checked={values.privacy_policy}
                        />
                      }
                      label={
                        <Typography variant='body2'>
                          He leído y acepto la{' '}
                          <a
                            target='_blank'
                            rel='noreferrer'
                            href='https://kodkod.cl/privacidad'
                          >
                            política de privacidad
                          </a>
                          .
                        </Typography>
                      }
                    />
                  </div>
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
                      className='login__button'
                      variant='contained'
                      type='submit'
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
  );
};

export default SignUp;

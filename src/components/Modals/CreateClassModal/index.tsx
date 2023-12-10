import type { FC, ChangeEvent } from 'react';
import {
  type CreateClassModalProps,
  type FormInitialState,
} from './interfaces';
import {
  Select,
  MenuItem,
  FormControl,
  TextField,
  Button,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
} from '@mui/material';
import { FormContainer } from './styled';
import { Formik, Form, type FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { createClass, updateClass } from 'services/classes';
import Toaster from 'utils/Toster';
import { type IClass } from 'global/interfaces';
import { useAuth } from 'contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTour } from '@reactour/tour';

const CreateClassModal: FC<CreateClassModalProps> = ({
  open,
  onClose,
  levels,
  classDetails,
}) => {
  const { setCurrentStep } = useTour();
  const [initialState, setInitialState] = useState<FormInitialState>({
    id_level: '',
    code: '',
    alias: '',
  });
  const { user } = useAuth();
  const validationSchema = () => {
    return Yup.object().shape({
      id_level: Yup.number().required(),
      code: Yup.string().required(),
      alias: Yup.string().required(),
    });
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (classDetails) {
      setInitialState({
        id_level: classDetails.level.id,
        code: classDetails.code,
        alias: classDetails.alias,
      });
    }
  }, [classDetails]);
  // extract first char from string
  const handleAliasValue = (
    e: ChangeEvent,
    values: FormInitialState,
    setFieldValue: FormikHelpers<FormInitialState>['setFieldValue']
  ) => {
    if (e) {
      const { name, value } = e.target as HTMLInputElement;
      if (name === 'id_level') {
        const level = levels.find((level) => level.id === value);
        setFieldValue('alias', `${level.name.charAt(0)}°${values.code}`);
      } else {
        const level = levels.find((level) => level.id === values.id_level);
        if (level) setFieldValue('alias', `${level.name.charAt(0)}°${value}`);
      }
    }
  };

  const handleSubmit = async (
    values: FormInitialState,
    formikHelpers: FormikHelpers<FormInitialState>
  ) => {
    try {
      if (classDetails) {
        const { data }: { data: { responseData: IClass } } = await updateClass({
          ...values,
          id_level: values.id_level as number,
          id: classDetails.id,
        });
        onClose('success', data.responseData);
        Toaster('success', `Curso editado exitosamente`);
        // TODO: remove this workarround
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        const { data }: { data: { responseData: IClass } } = await createClass({
          ...values,
          id_user: user.id,
          id_level: values.id_level as number,
        });

        // navigate(`/app/cursos/${data.responseData.id}/tablero`);
        onClose('success', data.responseData);
        Toaster('success', `Curso ${values.alias} creado exitosamente`);
      }
    } catch (error: any) {
      console.error(error);
      Toaster('error', `Hubo un error al crear el curso ${values.alias}`);
    } finally {
      formikHelpers.setSubmitting(false);
      setCurrentStep(4);
    }
  };
  return (
    <Dialog
      open={open}
      PaperProps={{ className: 'p-3', id: 'home-onboarding-3' }}
    >
      <DialogTitle fontWeight='bold'>
        {classDetails ? 'Editar curso' : 'Añade un nuevo curso'}
      </DialogTitle>
      <Formik
        initialValues={initialState}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          errors,
          submitCount,
          setFieldValue,
          isSubmitting,
          isValid,
          dirty,
        }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <DialogContent dividers className='py-5'>
                <FormContainer>
                  <FormControl error={!!errors.id_level && !!submitCount}>
                    <Typography
                      component='label'
                      variant='body1'
                      fontWeight='bold'
                      className='mb-1'
                    >
                      Nivel
                    </Typography>
                    <Select
                      name='id_level'
                      size='small'
                      placeholder='Selecciona un nivel'
                      onChange={(e) => {
                        handleChange(e);
                        handleAliasValue(
                          e as ChangeEvent<HTMLInputElement>,
                          values,
                          setFieldValue
                        );
                      }}
                      value={values.id_level}
                    >
                      <MenuItem value='' disabled>
                        Selecciona un nivel
                      </MenuItem>
                      {levels
                        .sort((a, b) => {
                          if (a._index > b._index) return 1;
                          if (a._index < b._index) return -1;
                          return 0;
                        })
                        .map((res, index) => {
                          return (
                            <MenuItem key={index} value={res.id}>
                              {res.name}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </FormControl>
                  <FormControl error={!!errors.code && !!submitCount}>
                    <div className='d-flex align-items-end mb-1'>
                      <Typography
                        component='label'
                        variant='body1'
                        fontWeight='bold'
                        className='me-1'
                      >
                        Curso
                      </Typography>
                      <Typography component='span' variant='caption'>
                        (Es la letra o nombre que acompaña al nivel e identifica
                        al curso)
                      </Typography>
                    </div>
                    <TextField
                      name='code'
                      placeholder='Ejemplo: A, B, C...'
                      onChange={(e) => {
                        handleAliasValue(e, values, setFieldValue);
                        handleChange(e);
                      }}
                      value={values.code}
                      size='small'
                    />
                  </FormControl>
                  {/* <FormControl error={!!errors.alias && !!submitCount}>
                    <div className="d-flex align-items-end mb-1">
                      <Typography
                        component="label"
                        variant="body1"
                        fontWeight="bold"
                        className="me-1"
                      >
                        Alias
                      </Typography>
                      <Typography component="span" variant="caption">
                        (Suele ser nivel + código del curso)
                      </Typography>
                    </div>
                    <TextField
                      name={"alias"}
                      placeholder="Ejemplo: 1°A, 2°B, 3°C..."
                      onChange={handleChange}
                      value={values.alias}
                      size="small"
                    />
                    </FormControl> */}
                </FormContainer>
              </DialogContent>
              <DialogActions className='pt-3'>
                <Button
                  id='create-class-cancel'
                  variant='outlined'
                  onClick={() => onClose('escapeKeyDown')}
                >
                  Cancelar
                </Button>
                <Button
                  id='home-onboarding-5'
                  disabled={
                    isSubmitting ||
                    !dirty ||
                    !values.code ||
                    !values.id_level ||
                    !values.alias
                  }
                  type='submit'
                  variant='contained'
                >
                  {classDetails ? 'Guardar cambios' : 'Añade un nuevo curso'}
                </Button>
              </DialogActions>
            </Form>
          );
        }}
      </Formik>
    </Dialog>
  );
};

export default CreateClassModal;

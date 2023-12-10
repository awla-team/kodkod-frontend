import React, { type FC, useEffect, useRef, useState } from 'react';
import { type StudentEditInputField, type StudentType } from './interfaces';
import { useClassContext } from '../../routes/Class/context';
import Toaster from '../../utils/Toster';
import { Form, Formik, type FormikHelpers } from 'formik';
import { updateStudent } from '../../services/students';
import {
  Avatar,
  Box,
  FormControl,
  IconButton,
  TextField,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import ConfirmationModal from '../Modals/ConfirmationModal';
import { StudentRow } from './styled';

export const StudentDetails: FC<{
  details: StudentType;
  handleDelete: (studentId: string | number) => Promise<boolean>;
}> = ({ details, handleDelete }) => {
  const [editState, setEditState] = useState<boolean>(false);
  const [elRef, setElRef] = useState<any | null>(null);
  const [openConfirmation, setOpenConfirmation] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const { updateStudentsData } = useClassContext();
  const handleMenuOpen = (e: React.MouseEvent) => {
    setOpenMenu(true);
    const { currentTarget } = e;
    setElRef(currentTarget);
  };
  const formRef = useRef(null);

  const handleConfirmationClose = () => {
    setOpenConfirmation(false);
    setElRef(null);
  };

  const handleDeleteCB = async () => {
    try {
      await handleDelete(details.id);
      Toaster('success', `Estudiante ${details.email} eliminado exitosamente`);
      setElRef(null);
      setOpenMenu(false);
      setOpenConfirmation(false);
      updateStudentsData('delete', details);
    } catch (error: any) {
      console.error(error);
      Toaster(
        'error',
        `Hubo un error al eliminar al estudiante ${details.email}`
      );
    }
  };

  const [inputValues, setInputValues] = useState<StudentEditInputField>({
    ...details,
  });

  useEffect(() => {
    if (details)
      setInputValues({
        first_name: details.first_name,
        last_name: details.last_name,
        email: details.email,
      });
  }, [details]);

  const handleSubmit = async (
    values: StudentEditInputField,
    formikHelper: FormikHelpers<StudentEditInputField>
  ) => {
    try {
      const { last_name, first_name, email } = values;
      const { data }: { data: { responseData: StudentType } } =
        await updateStudent(details.id, {
          role: 'student',
          email,
          last_name,
          first_name,
        });
      Toaster('success', 'Estudiante actualizado exitosamente');
      setEditState(false);
      updateStudentsData('update', data.responseData);
    } catch (error: any) {
      console.error(error);
      if (
        error?.response?.data?.responseData?.includes?.(
          'is not allowed to be empty'
        )
      )
        return Toaster('error', 'Todos los campos deben ser llenados');
      Toaster('error', 'Hubo un error al actualizar al estudiante');
    } finally {
      formikHelper.setSubmitting(false);
    }
  };

  const cancelEditMode = () => {
    setEditState(false);
    formRef.current?.resetForm();
  };

  return (
    <StudentRow
      className={`d-flex align-items-center w-100 ${
        editState ? 'editable' : ''
      }`}
    >
      <Avatar className='student-avatar me-3'>{`${details.first_name[0]}${details.last_name[0]}`}</Avatar>
      <Formik
        initialValues={inputValues}
        onSubmit={handleSubmit}
        innerRef={formRef}
      >
        {({
          handleSubmit,
          values,
          handleChange,
          isSubmitting,
          submitCount,
          errors,
        }) => {
          return (
            <Form onSubmit={handleSubmit} className='editable_section__form'>
              <div className='edit__section'>
                <div className='editable__field'>
                  <Box display='flex'>
                    {editState ? (
                      <FormControl error={!!errors.first_name && !!submitCount}>
                        <TextField
                          variant='standard'
                          autoFocus
                          disabled={!editState}
                          name='first_name'
                          className='name me-2'
                          placeholder='Nombres'
                          value={values.first_name}
                          onChange={handleChange}
                        />
                      </FormControl>
                    ) : (
                      <Typography>{details.first_name}&nbsp;</Typography>
                    )}
                    {editState ? (
                      <FormControl error={!!errors.last_name && !!submitCount}>
                        <TextField
                          variant='standard'
                          disabled={!editState}
                          name='last_name'
                          className='name'
                          placeholder='Apellidos'
                          value={
                            editState ? values.last_name : details.last_name
                          }
                          onChange={handleChange}
                        />
                      </FormControl>
                    ) : (
                      <Typography>{details.last_name}</Typography>
                    )}
                  </Box>
                  {editState ? (
                    <FormControl
                      className='mt-2'
                      error={!!errors.email && !!submitCount}
                    >
                      <TextField
                        variant='standard'
                        disabled={!editState}
                        name='email'
                        type='email'
                        className='email'
                        placeholder='E-mail'
                        value={values.email}
                        onChange={handleChange}
                      />
                    </FormControl>
                  ) : (
                    <Typography color='gray'>{details.email}</Typography>
                  )}
                </div>
                <div className='editable__action__section'>
                  {editState ? (
                    <>
                      <IconButton
                        disabled={isSubmitting}
                        type='submit'
                        color='primary'
                      >
                        <CheckIcon />
                      </IconButton>
                      <IconButton color='error' onClick={cancelEditMode}>
                        <CloseIcon />
                      </IconButton>
                    </>
                  ) : (
                    <IconButton
                      className='more-button'
                      color='inherit'
                      onClick={(e) => {
                        handleMenuOpen(e);
                      }}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  )}
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>

      <Menu
        elevation={1}
        open={!!elRef && openMenu}
        anchorEl={elRef}
        onClose={() => setElRef(null)}
      >
        <MenuItem
          onClick={() => {
            setEditState(true);
            setOpenMenu(false);
          }}
        >
          Editar
        </MenuItem>
        <MenuItem
          onClick={() => {
            setOpenConfirmation(true);
          }}
        >
          Eliminar
        </MenuItem>
      </Menu>
      <ConfirmationModal
        description={
          <span>
            Estás apunto de eliminar al estudiante{' '}
            <b>
              {details.first_name} {details.last_name}
            </b>
            . ¿Deseas continuar?
          </span>
        }
        open={openConfirmation}
        callBackFunction={handleDeleteCB}
        onClose={handleConfirmationClose}
      />
    </StudentRow>
  );
};

import React, { type FC, useEffect, useState } from 'react';
import { type AddStudentsDialogProps } from './interfaces';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { addStudentsInClass } from 'api/services/students';
import Toaster from 'utils/Toster';
import { type StudentType } from '../../StudentsList/interfaces';
import { StudentsFormDetailsContainer } from './styled';
import { Link } from 'react-router-dom';
import { read, utils } from 'xlsx';
import AddIcon from '@mui/icons-material/Add';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';

const AddStudentsDialog: FC<AddStudentsDialogProps> = ({
  open,
  onClose,
  classDetails,
}) => {
  const [students, setStudents] = useState<
    Array<{ first_name: string; last_name: string; email: string }>
  >(
    Array(5)
      .fill({})
      .map(() => ({
        first_name: '',
        last_name: '',
        email: '',
      }))
  );

  const [filled, setFilled] = useState<
    Array<{ first_name: string; last_name: string; email: string }>
  >([]);

  useEffect(() => {
    if (students.length)
      setFilled(
        students.filter(
          (student) => student.first_name || student.last_name || student.email
        )
      );
    else setFilled([]);
  }, [students]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const { data }: { data: { responseData: { students: StudentType[] } } } =
        await addStudentsInClass({
          // FIXME: fix this ts error
          // @ts-expect-error ts-error(2322)
          id_class: classDetails.id,
          // FIXME: fix this eslint error
          // eslint-disable-next-line @typescript-eslint/naming-convention
          students: filled.map(({ first_name, last_name, email }) => {
            return {
              first_name,
              last_name,
              email,
              role: 'student',
            };
          }),
        });
      const noOfStudents = filled.length;
      Toaster(
        'success',
        `${noOfStudents} ${
          noOfStudents < 2 ? 'estudiante' : 'estudiantes'
        } añadidos exitosamente`
      );
      onClose('student', data.responseData.students);
    } catch (error: any) {
      console.error(error);
      Toaster(
        'error',
        // FIXME: fix this ts error
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        error?.response?.data?.responseData ||
          'Hubo un error al añadir estudiantes'
      );
    }
  };

  const handleImport = ($event: React.ChangeEvent<HTMLInputElement>) => {
    const files = $event.target.files;

    // FIXME: fix this ts error
    // @ts-expect-error ts-error(18047)
    if (files.length) {
      // FIXME: fix this ts error
      // @ts-expect-error ts-error(18047)
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        // FIXME: fix this ts error
        // @ts-expect-error ts-error(18047)
        const wb = read(event.target.result);
        const sheets = wb.SheetNames;
        if (sheets.length) {
          const rows: Array<{
            Nombres: string;
            Apellidos: string;
            Email: string;
          }> = utils.sheet_to_json(wb.Sheets[sheets[0]]);

          setStudents(
            rows.map((student) => ({
              first_name: student.Nombres || '',
              last_name: student.Apellidos || '',
              email: student.Email || '',
            }))
          );
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <Dialog
      open={open}
      PaperProps={{ className: 'p-3', id: 'student-list-onboarding-2' }}
      maxWidth='sm'
      fullWidth
      fullScreen
    >
      <DialogTitle fontWeight='bold'>Añadir estudiantes</DialogTitle>
      <form
        className='d-flex flex-column flex-fill'
        style={{ overflow: 'hidden' }}
        onSubmit={async (event) => await handleSubmit(event)}
      >
        <DialogContent className='d-flex flex-column flex-fill'>
          <Typography variant='body2' className='mb-2'>
            Añade a tus estudiantes ingresando sus nombres, apellidos y correo.
            También puedes subir tus estudiantes con nuestra plantilla de excel.
          </Typography>
          <div id='student-list-onboarding-3'>
            <Button
              variant='outlined'
              component={Link}
              to='https://kodkod-assets.s3.amazonaws.com/documents/plantilla_estudiantes_kodkod.xlsx'
              download
              className='me-1'
              color='primary'
              size='small'
              startIcon={<FileDownloadIcon />}
            >
              Descargar plantilla excel
            </Button>
            <input
              style={{ display: 'none' }}
              type='file'
              name='file'
              id='inputGroupFile'
              onChange={handleImport}
              accept='.xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
            />
            <Button
              component='label'
              variant='contained'
              size='small'
              startIcon={<FileUploadIcon />}
              htmlFor='inputGroupFile'
            >
              Subir plantilla excel
            </Button>
          </div>
          <Box className='flex-fill my-4' sx={{ overflow: 'auto' }}>
            <StudentsFormDetailsContainer className='d-flex flex-column justify-content-between'>
              <Box className='details-list' id='student-list-onboarding-4'>
                {students.map((student, i) => (
                  <div key={i} className='d-flex align-items-center gap-2'>
                    <IconButton
                      color='inherit'
                      size='small'
                      disabled={students.length === 1}
                      onClick={() => {
                        const newValues = [...students];
                        newValues.splice(i, 1);
                        setStudents(newValues);
                      }}
                    >
                      <CloseIcon fontSize='small' />
                    </IconButton>
                    <div className='d-flex w-100 gap-3'>
                      <div className='flex-fill'>
                        <TextField
                          size='small'
                          value={student.first_name}
                          // FIXME: fix this ts error
                          // @ts-expect-error ts-error(2322)
                          error={
                            (student.last_name || student.email) &&
                            !student.first_name
                          }
                          onChange={(event) => {
                            const newStudents = [...students];
                            newStudents[i].first_name = event.target.value;
                            setStudents(newStudents);
                          }}
                          name={`students[${i}].first_name`}
                          variant='outlined'
                          placeholder='Nombres'
                          fullWidth
                        />
                      </div>
                      <div className='flex-fill'>
                        <TextField
                          size='small'
                          value={student.last_name}
                          // FIXME: fix this ts error
                          // @ts-expect-error ts-error(2322)
                          error={
                            (student.first_name || student.email) &&
                            !student.last_name
                          }
                          onChange={(event) => {
                            const newStudents = [...students];
                            newStudents[i].last_name = event.target.value;
                            setStudents(newStudents);
                          }}
                          name={`students[${i}].last_name`}
                          variant='outlined'
                          placeholder='Apellidos'
                          fullWidth
                        />
                      </div>
                      <div className='flex-fill'>
                        <TextField
                          size='small'
                          value={student.email}
                          // FIXME: fix this ts error
                          // @ts-expect-error ts-error(2322)
                          error={
                            (student.first_name || student.last_name) &&
                            !student.email
                          }
                          onChange={(event) => {
                            const newStudents = [...students];
                            newStudents[i].email = event.target.value;
                            setStudents(newStudents);
                          }}
                          name={`students[${i}].email`}
                          type='email'
                          variant='outlined'
                          placeholder='E-mail'
                          fullWidth
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </Box>
            </StudentsFormDetailsContainer>
          </Box>
          <div className='d-flex align-items-center justify-content-center'>
            <Button
              startIcon={<AddIcon />}
              className='w-50 mb-2'
              color='primary'
              onClick={() =>
                setStudents([
                  ...students,
                  { first_name: '', last_name: '', email: '' },
                ])
              }
            >
              Añadir una fila
            </Button>
          </div>
          <div className='d-flex'>
            <Typography
              textAlign='right'
              component='span'
              variant='body2'
              className='w-100 mt-2'
            >
              Estás añadiendo <b>{filled.length}</b> estudiantes a la clase{' '}
              <b>{classDetails.alias}</b>
            </Typography>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            variant='outlined'
            onClick={() => onClose()}
            id='add-students-cancel'
          >
            Cancelar
          </Button>
          <Button
            id='student-list-onboarding-5'
            variant='contained'
            type='submit'
            disabled={
              !filled.length ||
              !filled.every(
                (student) =>
                  student.first_name && student.last_name && student.email
              )
            }
          >
            Añadir estudiantes
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddStudentsDialog;

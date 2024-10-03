import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Tooltip,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import studentsIcon from 'assets/images/students_1.png';
import { useClassContext } from 'routes/Class/context';
import type ILesson from 'types/models/Lesson';
import { type AxiosResponse } from 'axios';
import { FetchStatus } from 'global/enums';
import Toaster from 'utils/Toster';
import { useClassroom } from 'zustand/classroom-store';
import { useSubjectStore } from 'zustand/subject-store';
import { ContentCopy } from '@mui/icons-material';
import { type IStudent } from 'global/interfaces';

const Students = () => {
  const { classroomDetails } = useClassContext();
  const { classroom } = useClassroom();
  const { subject } = useSubjectStore();
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<OrderBy>('last_name');

  type Order = 'asc' | 'desc';
  type OrderBy = keyof IStudent;

  // Función para copiar al portapapeles
  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    Toaster('success', `Correo copiado: ${text}`);
  };

  // Estados para paginación
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Manejador para cambiar la columna de orden y la dirección
  const handleRequestSort = (property: OrderBy) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Función para ordenar las filas de acuerdo con la columna y dirección seleccionada
  const sortedStudents = [...(classroom?.students || [])].sort((a, b) => {
    if (orderBy) {
      if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1;
      if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1;
    }
    return 0;
  });

  return (
    <div className='tw-space-y-10'>
      <div className='tw-flex tw-items-center tw-justify-between'>
        <div className='tw-flex tw-items-end tw-gap-2'>
          <img
            src={studentsIcon}
            alt='students'
            className='tw-w-10 tw-object-cover'
          />
          <h2 className='tw-font-bold tw-mb-0'>Lista de estudiantes</h2>
        </div>
      </div>
      <div>
        {/* Información del curso y profesor */}
        <div className='tw-flex tw-justify-between'>
          <h4 className='tw-flex'>
            <h4 className='tw-mr-2'>Curso: </h4>
            <b>{classroom?.title}</b>
          </h4>
          <h4 className='tw-flex'>
            <h4 className='tw-mr-2 tw-font-normal'>Asignatura: </h4>
            <b className='tw-font-bold'>{subject?.title}</b>
          </h4>
          <h4 className='tw-flex '>
            <h4 className='tw-mr-2'>Profesor: </h4>
            <b>
              {classroomDetails?.teacher.first_name +
                ' ' +
                classroomDetails?.teacher.last_name}
            </b>
            <Tooltip className='' title='Copiar correo'>
              <EmailOutlinedIcon
                className='tw-text-[#003CAF] tw-ml-3 tw-mt-1'
                onClick={async () =>
                  await copyToClipboard(classroomDetails?.teacher.email || '?')
                }
              >
                <ContentCopy />
              </EmailOutlinedIcon>
            </Tooltip>
          </h4>
        </div>

        {/* Tabla de estudiantes */}
        <TableContainer className='tw-border-solid tw-rounded-lg tw-border-2 tw-border-zinc-300'>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <h5 className='tw-text-[#003CAF]'>
                    <b>N° Lista</b>
                  </h5>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'first_name'}
                    direction={orderBy === 'first_name' ? order : 'asc'}
                    onClick={() => handleRequestSort('first_name')}
                  >
                    <h5 className='tw-text-[#003CAF]'>
                      <b>Nombres</b>
                    </h5>
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'last_name'}
                    direction={orderBy === 'last_name' ? order : 'asc'}
                    onClick={() => handleRequestSort('last_name')}
                  >
                    <h5 className='tw-text-[#003CAF]'>
                      <b>Apellido Paterno</b>
                    </h5>
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    direction={orderBy === 'last_name' ? order : 'asc'}
                    onClick={() => handleRequestSort('last_name')}
                  >
                    <h5 className='tw-text-[#003CAF]'>
                      <b>Apellido Materno</b>
                    </h5>
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'email'}
                    direction={orderBy === 'email' ? order : 'asc'}
                    onClick={() => handleRequestSort('email')}
                  >
                    <h5 className='tw-text-[#003CAF]'>
                      <b>Correo</b>
                    </h5>
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <h5 className='tw-text-[#003CAF]'>
                    <b></b>
                  </h5>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedStudents
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((student, index) => (
                  <TableRow
                    key={student.id}
                    className={index % 2 === 0 ? '' : 'tw-bg-[#7D92FF14]'}
                  >
                    <TableCell>
                      <h5 className='tw-justify-center tw-flex'>
                        <b>{index + 1 + page * rowsPerPage}</b>
                      </h5>
                    </TableCell>
                    <TableCell>
                      <h5>
                        <b>{student.first_name}</b>
                      </h5>
                    </TableCell>
                    <TableCell>
                      <h5>
                        <b>{student.last_name.split(' ').at(0)}</b>
                      </h5>
                    </TableCell>
                    <TableCell>
                      <h5>
                        <b>
                          {student.last_name.split(' ').length > 1
                            ? student.last_name.split(' ').at(1)
                            : ''}
                        </b>
                      </h5>
                    </TableCell>
                    <TableCell>
                      <h5>
                        <b className='tw-mr-2'>{student.email}</b>
                      </h5>
                    </TableCell>
                    <TableCell>
                      <Tooltip title='Copiar correo'>
                        <EmailOutlinedIcon
                          className='tw-text-[#003CAF]'
                          onClick={async () =>
                            await copyToClipboard(student.email)
                          }
                        >
                          <ContentCopy />
                        </EmailOutlinedIcon>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>

          {/* Paginación */}
          <TablePagination
            component='div'
            count={classroom?.students?.length || 1}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[]}
            labelRowsPerPage=''
            labelDisplayedRows={({ to, count }) => {
              const totalPages = Math.ceil(count / rowsPerPage);
              const currentPage = page + 1;
              return `Mostrando ${to} resultados de ${count} | Página ${currentPage} de ${totalPages}`;
            }}
            sx={{
              '.MuiTablePagination-displayedRows': {
                fontSize: '1.2rem', // Tamaño de texto más grande
                marginTop: '16px',
                marginRight: '0px', // Espacio entre el texto y las flechas
              },
            }}
          />
        </TableContainer>
      </div>
    </div>
  );
};

export default Students;

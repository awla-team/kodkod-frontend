import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  TableBody,
  TablePagination,
  Tooltip,
} from '@mui/material';
import StudentActivitiesByDay from 'components/StudentActivitiesByDay';
import { type IStudent } from 'global/interfaces';
import { useState, type FC } from 'react';
import HelpIcon from '@mui/icons-material/Help';

interface Props {
  students: IStudent[];
}

const StudentAnalysisList: FC<Props> = ({ students }) => {
  /* Inicio Gestion de tabla */
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<OrderBy>('last_name');
  // Estados para paginación
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  type Order = 'asc' | 'desc';
  type OrderBy = keyof IStudent;

  const mockData = [
    { date: 'Nov 12', activities: 3 },
    { date: 'Nov 13', activities: 5 },
    { date: 'Nov 14', activities: 7 },
    { date: 'Nov 15', activities: 3 },
    { date: 'Nov 16', activities: 5 },
    { date: 'Nov 17', activities: 7 },
    { date: 'Nov 18', activities: 3 },
    { date: 'Nov 19', activities: 5 },
    { date: 'Nov 20', activities: 7 },
    { date: 'Nov 21', activities: 4 },
    { date: 'Nov 22', activities: 8 },
    { date: 'Nov 23', activities: 1 },
    { date: 'Nov 24', activities: 3 },
    { date: 'Nov 25', activities: 1 },
    { date: 'Nov 26', activities: 5 },
    { date: 'Nov 27', activities: 1 },
    { date: 'Nov 28', activities: 2 },
    { date: 'Nov 29', activities: 1 },
    { date: 'Nov 30', activities: 4 },
    { date: 'Nov 31', activities: 1 },
  ];

  const mockData2 = [
    { date: '2024-11-12', activities: 3 },
    { date: '2024-11-13', activities: 5 },
    { date: '2024-11-14', activities: 7 },
    { date: '2024-11-15', activities: 3 },
    { date: '2024-11-16', activities: 5 },
    { date: '2024-11-17', activities: 7 },
    { date: '2024-11-18', activities: 3 },
    { date: '2024-11-19', activities: 5 },
    { date: '2024-11-20', activities: 7 },
  ];
  const mockData3 = [
    { date: 'Nov 12', activities: 3 },
    { date: 'Nov 13', activities: 5 },
    { date: 'Nov 14', activities: 7 },
  ];
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
  const sortedStudents = [...(students || [])].sort((a, b) => {
    if (orderBy) {
      if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1;
      if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1;
    }
    return 0;
  });
  /* Fin Gestion de Tabla */

  return (
    <div>
      <TableContainer>
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
              <TableCell className='tw-justify-center tw-flex'>
                <TableSortLabel
                  active={orderBy === 'email'}
                  direction={orderBy === 'email' ? order : 'asc'}
                  onClick={() => handleRequestSort('email')}
                >
                  <h5 className='tw-text-[#003CAF]'>
                    <b>Actividades por dia</b>{' '}
                    <Tooltip className='' title='tooltip test text'>
                      <HelpIcon
                        fontSize='small'
                        className='tw-text-gray-600 hover:tw-cursor-pointer tw-mb-1'
                      />
                    </Tooltip>
                  </h5>
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <div />
          <TableBody className='tw-border-solid tw-border-2  tw-border-t-primary-500 tw-border-zinc-300'>
            {sortedStudents
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((student, index) => (
                <TableRow
                  key={student.id}
                  className={index % 2 !== 0 ? '' : 'tw-bg-[#7D92FF14]'}
                >
                  <TableCell>
                    <div className='tw-flex tw-gap-2 tw-justify-end'>
                      <div>
                        <img
                          // src={studentsIcon}
                          alt='alert'
                          className='tw-w-10 tw-object-cover'
                          hidden={true}
                        />
                      </div>
                      <h5>
                        <b>{index + 1 + page * rowsPerPage}</b>
                      </h5>
                    </div>
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
                  <TableCell className='tw-w-[500px] tw-justify-center tw-flex'>
                    <StudentActivitiesByDay
                      data={index % 2 === 0 ? mockData : mockData3}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        {/* Paginación */}
        <TablePagination
          component='div'
          count={students?.length || 1}
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
  );
};

export default StudentAnalysisList;

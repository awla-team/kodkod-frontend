import {
  DontHaveDetailsContent,
  StudentDetailBox,
  StudentListContainer,
  StudentListContent,
  StudentsListDetailsContainer,
} from './styled';
import { Dispatch, FC, SetStateAction } from 'react';
import { Button, Typography } from '@mui/material';
import { StudentsListProps, StudentType } from './interfaces';
import { useState } from 'react';
import AddStudentsDialog from '../Modals/AddStudentsDialog';
import { useClassContext } from '../../routes/Class/context';
import { deleteStudent } from '../../services/students';
import { StudentDetails } from './StudentDetails';

const StudentsList: FC<StudentsListProps> = ({
  studentsData,
  classDetails,
}: StudentsListProps) => {
  const [OpenModal, setOpenModal] = useState<boolean>(false);
  const { updateStudentsData } = useClassContext();
  const handleModalClose = (
    reason: 'student' | undefined,
    data?: StudentType[]
  ) => {
    if (reason === 'student' && data) {
      updateStudentsData('update', data);
    }
    setOpenModal(false);
  };

  // temporary approcah
  const handleDelete = (studentId: string | number): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        if (studentId) {
          await deleteStudent(studentId);
          resolve(true);
        }
        reject({ message: "Student id didn't find." });
      } catch (e: any) {
        reject(e);
      }
    });
  };
  return (
    <StudentListContainer>
      <Typography component="h6" variant="h6" fontWeight="bold">
        Lista de estudiantes
      </Typography>
      <Typography
        component="span"
        variant="body1"
        sx={{ opacity: '0.6' }}
      >{`${studentsData.length} estudiantes en total`}</Typography>
      <StudentListContent hasDetails={!!studentsData.length}>
        {studentsData.length ? (
          <StudentsListDetails
            handleDelete={handleDelete}
            studentsData={studentsData}
            setOpenModal={setOpenModal}
          />
        ) : (
          <DontHaveDetails setOpenModal={setOpenModal} />
        )}
      </StudentListContent>
      {OpenModal && (
        <AddStudentsDialog
          classDetails={classDetails}
          open={OpenModal}
          onClose={handleModalClose}
        />
      )}
    </StudentListContainer>
  );
};

export default StudentsList;

const DontHaveDetails: FC<{
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}> = ({ setOpenModal }) => {
  return (
    <DontHaveDetailsContent>
      <Typography component="span" variant="body1">
        Aún no has añadido estudiantes a tu curso
      </Typography>
      <Button
        size="large"
        variant={'contained'}
        onClick={() => setOpenModal(true)}
      >
        Añadir estudiantes
      </Button>
    </DontHaveDetailsContent>
  );
};

const StudentsListDetails: FC<{
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  studentsData: StudentType[];
  handleDelete: (studentId: string | number) => Promise<boolean>;
}> = ({ setOpenModal, handleDelete, studentsData }) => {
  return (
    <StudentsListDetailsContainer>
      <div className={'details'}>
        {studentsData
          .sort((a, b) => {
            if (a.last_name > b.last_name) return 1;
            if (a.last_name < b.last_name) return -1;
            return 0;
          })
          .map((res, index) => {
            return (
              <StudentDetailBox key={`${index}-${res.id}`}>
                <StudentDetails details={res} handleDelete={handleDelete} />
              </StudentDetailBox>
            );
          })}
      </div>

      <Button
        size="large"
        variant={'contained'}
        onClick={() => setOpenModal(true)}
      >
        Añadir estudiantes
      </Button>
    </StudentsListDetailsContainer>
  );
};

import { Typography, Chip } from '@mui/material';
import { Box } from '@mui/system';
import { type ITeacherSubjectClassroom } from 'global/interfaces';
import { useNavigate } from 'react-router-dom';
import type Subject from 'types/models/Subject';
import { useSubjectStore } from 'zustand/subject-store';

const ClassCard: React.FC<{
  classroom?: ITeacherSubjectClassroom;
}> = ({ classroom }) => {
  const navigate = useNavigate();
  const { setSubject } = useSubjectStore();

  const goToClass = () => {
    setSubject(
      /* {name: 'Lenguaje y Comunicacion',} */
      classroom?.subject as Subject
    );
    navigate(
      `cursos/${classroom?.id}/asignaturas/${classroom?.subject_id}/clases`
    );
  };

  return (
    <div onClick={goToClass}>
      <div className='class__level__card'>
        {classroom?.subject ? (
          <Box
            className='d-flex justify-content-end p-2 class-img-container'
            sx={{
              // backgroundImage: `url(${classObj.current_adventure.adventure.thumbnail})`,
              backgroundImage: `url(https://kodkod-assets.s3.amazonaws.com/images/adventures/00SA/00SA-thumbnail.jpg)`,
            }}
          />
        ) : (
          <Box
            className='d-flex justify-content-end p-2 class-img-container'
            sx={{
              backgroundImage: `url(https://kodkod-assets.s3.amazonaws.com/images/adventures/00SA/00SA-thumbnail.jpg)`,
            }}
          />
        )}
        <div className='p-4'>
          <Typography
            component='h4'
            variant='h4'
            fontWeight='bold'
            className='mb-2'
            overflow='hidden'
            textOverflow='ellipsis'
          >
            {classroom?.classroom.title}
          </Typography>
          <Typography
            component='span'
            variant='h5'
            textAlign='center'
            fontWeight='bold'
          >
            {classroom?.subject.title
              ? classroom?.subject.title
              : 'Sin Informacion'}
          </Typography>
          <Typography
            className='tw-flex'
            component='span'
            variant='h6'
            textAlign='center'
          >
            {classroom?.classroom.students?.length
              ? classroom?.classroom.students.length + ' Estudiantes'
              : '0 Estudiantes'}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;

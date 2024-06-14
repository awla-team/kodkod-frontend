import { Typography, Chip } from '@mui/material';
import { Box } from '@mui/system';
import {
  type ITeacherSubjectClassroomList,
  type IClass,
} from 'global/interfaces';
import { useNavigate } from 'react-router-dom';
import { useSubjectStore } from 'zustand/subject-store';

const ClassCard: React.FC<{
  classObj?: IClass;
  classroom?: ITeacherSubjectClassroomList;
}> = ({ classObj, classroom }) => {
  const navigate = useNavigate();
  const { setSubject } = useSubjectStore();

  const goToClass = () => {
    setSubject({
      name: 'Lenguaje y Comunicacion',
    });
    navigate(`cursos/${classObj?.id}/asignaturas/1/clases`);
  };

  return (
    <div onClick={goToClass}>
      <div className='class__level__card'>
        {classObj?.current_adventure ? (
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
            {classObj?.alias}
          </Typography>
          <Typography
            component='span'
            variant='h5'
            textAlign='center'
            fontWeight='bold'
          >
            {classroom?.subject.name
              ? classroom?.subject.name
              : 'Sin Informacion'}
          </Typography>
          <Typography
            className='tw-flex'
            component='span'
            variant='h6'
            textAlign='center'
          >
            {classroom?.classroom.students.length
              ? classroom?.classroom.students.length
              : '0 Estudiantes'}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;

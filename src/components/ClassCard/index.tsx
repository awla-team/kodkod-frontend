import { Typography, Chip } from '@mui/material';
import { Box } from '@mui/system';
import { type ModifiedIClass } from 'global/interfaces';
import { useNavigate } from 'react-router-dom';
import { useSubjectStore } from 'zustand/subject-store';

const ClassCard: React.FC<{ classObj: ModifiedIClass }> = ({ classObj }) => {
  const navigate = useNavigate();
  const { setSubject } = useSubjectStore();

  const goToClass = () => {
    setSubject({
      name: 'Lenguaje y Comunicacion',
    });
    navigate(`cursos/${classObj.id}/asignaturas/1/clases`);
  };

  return (
    <div onClick={goToClass}>
      <div className='class__level__card'>
        {classObj.current_adventure ? (
          <Box
            className='d-flex justify-content-end p-2 class-img-container'
            sx={{
              backgroundImage: `url(${classObj.current_adventure.adventure.thumbnail})`,
            }}
          >
            <Chip color='primary' label='Aventura en curso' />
          </Box>
        ) : (
          <Box
            className='d-flex justify-content-end p-2 class-img-container'
            sx={{
              backgroundImage: `url(https://kodkod-assets.s3.amazonaws.com/images/adventures/00SA/00SA-thumbnail.jpg)`,
            }}
          >
            <Chip label='Sin aventura en curso' color='info' />
          </Box>
        )}
        <div className='p-4'>
          <Typography
            title={classObj.alias}
            component='h4'
            variant='h4'
            fontWeight='bold'
            className='mb-2'
            overflow='hidden'
            textOverflow='ellipsis'
          >
            {classObj.alias}
          </Typography>
          <Typography component='span' variant='body1' textAlign='center'>
            {classObj.current_adventure
              ? classObj.current_adventure.adventure.title
              : 'Sin aventura en curso'}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;

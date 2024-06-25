import { DetailsCardContent } from './styled';
import { type ClassDetailsCardProps } from './interfaces';
import React, { type FC, useState, useEffect } from 'react';
import {
  Button,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link, useNavigate } from 'react-router-dom';
import { CreateClassModal } from '../Modals';
import { useClassContext } from 'routes/Class/context';
import { type IClass, type IStage } from 'global/interfaces';
import ConfirmationModal from '../Modals/ConfirmationModal';
import Toaster from '../../utils/Toster';
import { deleteClass } from '../../services/classes';
import SkillPoints from 'components/SkillPoints';
import YouTubeIcon from '@mui/icons-material/YouTube';

const ClassDetailsCard: FC<ClassDetailsCardProps> = ({
  classDetails,
  classroomDetails,
  levels,
}) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState<boolean>(false);
  const [openDeleteConfirmationDialog, setOpenDeleteConfirmationDialog] =
    useState<boolean>(false);
  const { setClassDetails } = useClassContext();
  const [loading, setLoading] = useState<boolean>(false);
  // FIXME: fix this ts error
  // @ts-expect-error ts-error(2345): argument of type 'undefined' is not assignable to parameter of type 'IStage | (() => IStage)'
  const [latestStage, setLatestStage] = useState<IStage>(undefined);

  useEffect(() => {
    if (classDetails?.current_adventure?.stages?.length) {
      const filtered = classDetails.current_adventure.stages.filter(
        (stage) => stage.active
      );
      const newLatestStage = [...filtered].sort((a, b) => {
        if (a._index > b._index) return 1;
        if (a._index < b._index) return -1;
        return 0;
      });
      setLatestStage(newLatestStage[newLatestStage.length - 1]);
    }
  }, [classDetails]);

  const handleClose = (
    reason: 'backdropClick' | 'escapeKeyDown' | 'success',
    data?: IClass
  ) => {
    setClassDetails((prevState) => {
      return { ...prevState, ...data };
    });
    setOpen(false);
    setAnchorEl(null);
  };

  const handleMenuOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { currentTarget } = e;
    // FIXME: fix this ts error
    // @ts-expect-error ts-error(2345): argument of type 'EventTarget & HTMLButtonElement' is not assignable to parameter of type 'SetStateAction<null>'
    setAnchorEl(currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = () => {
    navigate(`/app/cursos/${classDetails.id}/aventuras`);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      // FIXME: fix this ts error
      // @ts-expect-error ts-error(2345): 'undefined' is not assignable to type 'string | number'
      await deleteClass(classDetails.id);
      Toaster('success', `Curso ${classDetails.alias} eliminado exitosamente`);
      navigate('/app', { replace: true });
      // window.location.reload();
    } catch (error: any) {
      console.error(error);
      Toaster(
        'error',
        `Hubo un error al eliminar el curso ${classDetails.alias}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DetailsCardContent>
      <div>
        {classDetails.current_adventure ? (
          <Box
            className='p-5'
            sx={{
              backgroundImage: `url(${latestStage?.icon})`,
              borderRadius: '8px',
              color: '#FFF',
              boxShadow: 'rgb(0, 0, 0) 0px 0px 200px 60px inset',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
          >
            <Box
              display='flex'
              sx={{ position: 'relative' }}
              alignItems='start'
              justifyContent='space-between'
            >
              <Typography
                component='h2'
                title={classDetails.alias}
                variant='h2'
                fontWeight='bold'
                className='mb-2'
                textOverflow='ellipsis'
                overflow='hidden'
              >
                {classDetails.alias}
              </Typography>
              <div className='d-flex align-items-center justify-content-center'>
                <Button
                  variant='outlined'
                  size='small'
                  component={Link}
                  to='https://www.youtube.com/watch?v=qUtkFGhnrLo'
                  target='_blank'
                  color='info'
                >
                  <YouTubeIcon className='me-2' />
                  Ver video introductorio
                </Button>
                <IconButton
                  sx={{ marginLeft: '8px' }}
                  color='inherit'
                  onClick={handleMenuOpen}
                >
                  <MoreVertIcon fontSize='large' />
                </IconButton>
              </div>
              <Menu
                open={!!anchorEl}
                anchorEl={anchorEl}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => setOpen(true)}>
                  Editar información del curso
                </MenuItem>
                <MenuItem onClick={() => setOpenDeleteConfirmationDialog(true)}>
                  Eliminar curso
                </MenuItem>
              </Menu>
            </Box>
            <Typography
              variant='h6'
              fontWeight='bold'
            >{`${classDetails.current_adventure?.adventure?.title}`}</Typography>
            <Typography
              variant='body1'
              className='mb-2'
            >{`Etapa ${latestStage?._index}: ${latestStage?.title}`}</Typography>
            <section className='d-flex flex-column mb-3'>
              <div className='d-flex flex-wrap flex-lg-nowrap gap-2'>
                {classDetails.current_adventure?.adventure?.skills?.length
                  ? classDetails.current_adventure?.adventure?.skills.map(
                      (adventureSkill, index) => (
                        <SkillPoints
                          key={`${adventureSkill.id}-${adventureSkill.title}-${index}`}
                          skill={adventureSkill}
                        />
                      )
                    )
                  : null}
              </div>
            </section>
            <div className='mt-2'>
              <Button variant='contained' onClick={handleNavigate}>
                Continuar aventura
              </Button>
            </div>
          </Box>
        ) : (
          <div className='d-flex flex-column p-5'>
            <Box
              display='flex'
              sx={{ position: 'relative' }}
              alignItems='start'
              justifyContent='space-between'
            >
              <Typography
                component='h2'
                title={classDetails.alias}
                variant='h2'
                fontWeight='bold'
                className='mb-2'
                textOverflow='ellipsis'
                overflow='hidden'
              >
                {classDetails.alias}
              </Typography>
              <div className='d-flex align-items-center justify-content-center'>
                <Button
                  variant='outlined'
                  size='small'
                  component={Link}
                  to='https://www.youtube.com/watch?v=oymcbyiloIs'
                  target='_blank'
                >
                  <YouTubeIcon className='me-2' />
                  Ver video introductorio
                </Button>
                <IconButton
                  sx={{ marginLeft: '8px' }}
                  color='inherit'
                  onClick={handleMenuOpen}
                >
                  <MoreVertIcon fontSize='large' />
                </IconButton>
              </div>
              <Menu
                open={!!anchorEl}
                anchorEl={anchorEl}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => setOpen(true)}>
                  Editar información del curso
                </MenuItem>
                <MenuItem onClick={() => setOpenDeleteConfirmationDialog(true)}>
                  Eliminar curso
                </MenuItem>
              </Menu>
            </Box>
            <Typography
              component='span'
              variant='body1'
              fontWeight='bold'
              mb={1}
            >
              ¡Aún no has seleccionado una aventura!
            </Typography>
            <Typography component='span' variant='body1'>
              Presiona el botón a continuación para escoger una aventura que se
              ajuste a tus objetivos
            </Typography>
            <div className='mt-4'>
              <Button variant='contained' size='large' onClick={handleNavigate}>
                Selecciona una aventura
              </Button>
            </div>
          </div>
        )}
      </div>
      <CreateClassModal
        classroomDetails={classroomDetails}
        open={open}
        onClose={handleClose}
        levels={levels}
      />
      <ConfirmationModal
        title={`¿Estás seguro de eliminar el curso ${classDetails.alias}? `}
        open={openDeleteConfirmationDialog}
        callBackFunction={handleDelete}
        onClose={() => setOpenDeleteConfirmationDialog(false)}
        loading={loading}
        description={
          <Typography>
            El curso será eliminado y el avance de la aventura se perderá.
          </Typography>
        }
      />
    </DetailsCardContent>
  );
};

export default ClassDetailsCard;

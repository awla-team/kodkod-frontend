import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SortIcon from '@mui/icons-material/Sort';
import ViewLearningGoalsDialog from 'components/Modals/ViewLearningGoalsDialog';
import { type IUnit } from 'components/Modals/ViewLearningGoalsDialog/interfaces';
import { useQuery } from '@tanstack/react-query';
import { CircularProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { searchUnits } from 'services/units';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { getLessonsByTeacherSubjectClassroomId } from 'services/lessons';
import book from 'assets/images/book.png';
import { useClassContext } from 'routes/Class/context';
import SaveLesson from 'routes/Class/Subjects/SaveLesson';
import LessonDetails from './Lesson';
import type ILesson from 'types/models/Lesson';
import { type AxiosResponse } from 'axios';
import { FetchStatus } from 'global/enums';
import { getTeacherSubjectClassroomById } from 'services/teacher_subject_classroom';
import Toaster from 'utils/Toster';

const SubjectActivities = () => {
  const [openLearningObjetives, setOpenLearningObjetives] =
    useState<boolean>(false);
  const [selectedLesson, setSelectedLesson] = useState<ILesson>();
  const [lessons, setLessons] = useState<ILesson[]>([
    {
      id: 10,
      classroom_id: 2,
      index: 1,
      title: 'Textos Literarios',
      // teacher_subject_classroom_id: 1,
    },
    {
      id: 1,
      classroom_id: 1,
      index: 1,
      title: 'Textos Literarios',
      // teacher_subject_classroom_id: 1,
    },
    {
      id: 1,
      classroom_id: 1,
      index: 1,
      title: 'Textos Literarios',
      // teacher_subject_classroom_id: 1,
    },
    {
      id: 1,
      classroom_id: 1,
      index: 1,
      title: 'Textos Literarios',
      // teacher_subject_classroom_id: 1,
    },
    {
      id: 1,
      classroom_id: 1,
      index: 1,
      title: 'Textos Literarios',
      // teacher_subject_classroom_id: 1,
    },
    {
      id: 2,
      classroom_id: 1,
      index: 1,
      title: 'Introduccion a los textos argumentativos',
      ended_at: new Date(),
      // teacher_subject_classroom_id: 1,
    },
  ]);
  const [openSaveLesson, setOpenSaveLesson] = useState<boolean>(false);
  const [openLesson, setOpenLesson] = useState<boolean>(false);
  const { classroomDetails } = useClassContext();

  const {
    isLoading,
    data: result,
    isError,
    refetch: reloadUnits,
  } = useQuery({
    queryKey: [classroomDetails?.subject_id, classroomDetails?.classroom_id],
    queryFn: async () =>
      await searchUnits({
        subjectId: classroomDetails?.subject_id || 0,
        classroomId: classroomDetails?.classroom_id || 0,
      }),
  });

  const loadClasroomUnits = async () => {
    try {
      if (classroomDetails?.id) {
        const lessonsList = await getLessonsByTeacherSubjectClassroomId(
          classroomDetails.id
        );
        setLessons(lessonsList);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    void loadClasroomUnits();
  });

  const reloadSubjectActivities = async () => {
    setOpenSaveLesson(false);
    await reloadUnits();
    await loadClasroomUnits();
  };

  const closeLessonDetails = async () => {
    setOpenLesson(false);
    await reloadUnits();
    await loadClasroomUnits();
  };

  if (isLoading)
    return (
      <div className='tw-flex tw-justify-center tw-items-center'>
        <CircularProgress />
      </div>
    );

  if (isError || !result)
    return (
      <Typography component='h1' variant='h5' className='text-center'>
        Hubo un error al cargar los datos. Inténtalo de nuevo recargando la
        página.
      </Typography>
    );

  /* if (lessons.length === 0)
    return (
      <Typography component='h1' variant='h5' className='text-center'>
        No hay datos disponibles. Inténtalo de nuevo recargando la página.
      </Typography>
    ); */

  if (openSaveLesson && classroomDetails) {
    return (
      <SaveLesson
        classroomDetails={classroomDetails}
        handleClose={reloadSubjectActivities}
      />
    );
  }

  if (openLesson && selectedLesson && classroomDetails) {
    return (
      <LessonDetails
        handleClose={closeLessonDetails}
        selectedLesson={selectedLesson}
      />
    );
  }

  const { data: units } = result;

  return (
    <div className='tw-space-y-20'>
      <div className='tw-flex tw-items-center tw-justify-between'>
        <div className='tw-flex tw-items-end tw-gap-2'>
          <img src={book} alt='book' className='tw-w-10 tw-object-cover' />
          <h2 className='tw-font-bold tw-mb-0'>Mis clases</h2>
        </div>
      </div>

      {lessons && lessons.length > 0 ? (
        <div className='tw-h-auto tw-flex tw-flex-col tw-mx-3'>
          {lessons.map((lesson, index) => (
            <div
              key={index}
              className='tw-rounded-md tw-flex tw-h-auto tw-flex-col'
            >
              <div className='tw-flex tw-justify-between tw-items-center tw-mx-4'>
                <div>
                  <h4 className='tw-flex tw-items-center tw-font-semibold tw-mb-4 tw-gap-4'>
                    {lesson.title}{' '}
                    {lesson.ended_at ? (
                      <div className='tw-border tw-rounded-full tw-bg-[#0E8A1A]'>
                        <h5 className='tw-mx-3 tw-my-2 tw-text-white'>
                          <b>Clase finalizada</b>
                        </h5>
                      </div>
                    ) : (
                      ''
                    )}
                  </h4>
                  <h5>
                    {lesson.ended_at
                      ? `Finalizado el ${lesson.ended_at.toLocaleDateString()}`
                      : 'En progreso'}
                  </h5>
                </div>
                <div>
                  <button
                    onClick={() => {
                      setSelectedLesson(lesson);
                      setOpenLesson(true);
                    }}
                    type='button'
                    className='tw-bg-white tw-text-black tw-boder-solid tw-border-black hover:tw-cursor-pointer tw-transition-all tw-duration-200 tw-ease-in-out tw-bg-transparent hover:tw-bg-indigo-100'
                  >
                    <b> {'Ver Clase '}</b>
                  </button>
                </div>
              </div>

              {index + 1 === lessons.length ? '' : <hr />}
            </div>
          ))}

          <div className='tw-flex tw-justify-end tw-mt-20'>
            <button
              onClick={() => {
                setOpenSaveLesson(true);
              }}
              type='button'
              className='tw-border tw-rounded-full tw-bg-[#003CAF]'
            >
              <h4 className='tw-flex tw-flex-row tw-items-center tw-justify-center'>
                <b className='tw-flex tw-flex-row tw-items-center tw-justify-center tw-mr-2'>
                  <AddOutlinedIcon fontSize='large' />
                  Nueva clase
                </b>
              </h4>
            </button>
          </div>
        </div>
      ) : (
        <div className='tw-flex tw-justify-center tw-items-center tw-flex-col tw-gap-2'>
          <h2>
            <b className='tw-text-gray-500'>Crea una clase para empezar</b>
          </h2>
          <button
            onClick={() => {
              setOpenSaveLesson(true);
            }}
            type='button'
            className='tw-border tw-rounded-full tw-bg-[#003CAF]'
          >
            <b className='tw-flex tw-flex-row tw-items-center tw-justify-center'>
              <AddOutlinedIcon fontSize='large' />
              Nueva clase
            </b>
          </button>
        </div>
      )}
    </div>
  );
};

export default SubjectActivities;

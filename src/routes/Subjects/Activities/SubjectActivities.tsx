import { useQuery } from '@tanstack/react-query';
import { CircularProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { searchUnits } from 'services/units';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import book from 'assets/images/book.png';
import { useClassContext } from 'routes/Class/context';
import SaveLesson from 'routes/Class/Subjects/SaveLesson';
import LessonDetails from './Lesson';
import type ILesson from 'types/models/Lesson';
import { type IUnit } from 'components/Modals/ViewLearningGoalsDialog/interfaces';

const SubjectActivities = () => {
  const [selectedUnit, setSelectedUnit] = useState<IUnit>();
  const [selectedLesson, setSelectedLesson] = useState<ILesson>();
  const [lessons, setLessons] = useState<ILesson[]>([]);
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

  const reloadSubjectActivities = async () => {
    setOpenSaveLesson(false);
    await reloadUnits();
  };

  const closeLessonDetails = async () => {
    setOpenLesson(false);
    await reloadUnits();
  };

  useEffect(() => {
    if (result?.data) {
      const lessonsList = result.data.map((unit) => unit.lessons).flat();
      if (lessonsList) setLessons(lessonsList as ILesson[]);
    }
  }, [result?.data]);

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

  if (result?.data && result.data.length === 0)
    return (
      <Typography component='h1' variant='h5' className='text-center'>
        No hay datos disponibles. Inténtalo de nuevo recargando la página.
      </Typography>
    );

  if (openSaveLesson && selectedUnit && classroomDetails) {
    return (
      <SaveLesson
        classroomDetails={classroomDetails}
        handleClose={reloadSubjectActivities}
        selectedUnit={selectedUnit}
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
                      ? `Finalizado el ${new Date(
                          lesson.ended_at
                        ).toLocaleDateString()}`
                      : 'En progreso'}
                  </h5>
                </div>
                <div>
                  <button
                    onClick={() => {
                      setSelectedUnit(
                        result?.data?.find?.(
                          (unit) => unit.id === lesson.unit_id
                        )
                      );
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
                setSelectedUnit(result?.data?.[0]);
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
              setSelectedUnit(result?.data?.[0]);
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

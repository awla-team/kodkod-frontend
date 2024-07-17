import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SortIcon from '@mui/icons-material/Sort';
import ViewLearningGoalsDialog from 'components/Modals/ViewLearningGoalsDialog';
import { type IUnit } from 'components/Modals/ViewLearningGoalsDialog/interfaces';
import { useQuery } from '@tanstack/react-query';
import { CircularProgress } from '@mui/material';
import { useSubjectStore } from 'zustand/subject-store';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { searchUnits } from 'services/units';
import book from 'assets/images/book.png';

const SubjectActivities = () => {
  const [openLearningObjetives, setOpenLearningObjetives] =
    useState<boolean>(false);
  const { subject, classroomId } = useSubjectStore();
  const [selectedUnit, setSelectedUnit] = useState<IUnit>();
  const navigate = useNavigate();

  const {
    isLoading,
    data: result,
    isError,
  } = useQuery({
    queryKey: ['lessons'],
    queryFn: () =>
      searchUnits({
        subject_id: subject ? subject.id : 0,
        classroom_id: classroomId,
      }),
  });

  if (isLoading)
    return (
      <div className='tw-flex tw-justify-center tw-items-center'>
        <CircularProgress />
      </div>
    );

  if (isError || !result || result.data.length === 0) return <p>error</p>;

  const { data: units } = result;

  return (
    <div className='tw-space-y-6'>
      <div className='tw-flex tw-items-center tw-justify-between'>
        <div className='tw-flex tw-items-end tw-gap-2'>
          <img src={book} alt='book' className='tw-w-10 tw-object-cover' />
          <h3 className='tw-font-bold tw-text-2xl tw-mb-0'>Clases</h3>
        </div>

        <button type='button' className='tw-text-sm tw-bg-indigo-600'>
          Añadir unidad
        </button>
      </div>

      <div className='tw-flex tw-flex-col tw-gap-8'>
        {units.map((unit, index) => (
          <div key={index} className='tw-flex tw-flex-col'>
            <div className='tw-flex tw-justify-between tw-items-center'>
              <div className='tw-flex tw-items-center tw-gap-2 tw-px-0 tw-py-0 hover:tw-border-transparent'>
                <h4 className='tw-text-lg tw-font-semibold'>
                  Unidad 1 {unit.title}
                </h4>
                <div>
                  <button
                    type='button'
                    className='tw-bg-transparent text-sm tw-text-gray-800'
                  >
                    <EditNoteIcon />
                  </button>
                  <button
                    type='button'
                    className='tw-bg-transparent text-sm tw-text-gray-800'
                  >
                    <DeleteOutlineIcon />
                  </button>
                </div>
              </div>
              <button
                onClick={() => setOpenLearningObjetives(true)}
                type='button'
                className='tw-text-sm tw-bg-transparent tw-font-bold tw-text-indigo-600'
              >
                <SortIcon className='tw-mr-2' />
                Objetivos de aprendizaje
              </button>
            </div>
            <hr />
            {unit.lessons && (
              <div className='tw-grid tw-grid-cols-4 tw-gap-4'>
                {unit.lessons.map((lesson, index) => (
                  <div
                    key={index}
                    className='tw-border tw-shadow tw-rounded-md tw-flex tw-h-40 tw-flex-col hover:tw-cursor-pointer tw-transition-all tw-duration-200 tw-ease-in-out tw-bg-transparent hover:tw-bg-indigo-100 tw-p-4 tw-gap-2'
                  >
                    <div className='tw-flex tw-justify-between'>
                      <span className='tw-text-sm tw-font-semibold'>
                        Clase 1
                      </span>
                      <div>
                        <AddCircleOutlinedIcon />
                      </div>
                    </div>
                    <p className='tw-line-clamp-3 tw-text-sm'>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Enim exercitationem porro quasi, nesciunt, hic nihil
                      saepe, illum ex tempora quae est! Ipsum porro suscipit
                      accusamus doloremque ut, dolores optio id.
                    </p>
                  </div>
                ))}
                <button
                  className='tw-border tw-border-dashed tw-rounded-md tw-h-40 tw-flex tw-justify-center tw-items-center tw-flex-col hover:tw-cursor-pointer tw-transition-all tw-duration-200 tw-ease-in-out tw-bg-transparent hover:tw-bg-indigo-100 tw-text-black tw-border-black'
                  onClick={() => navigate('/app/classroom/1/lessons/new')}
                >
                  <AddCircleOutlinedIcon />
                  <span className='tw-text-sm tw-font-semibold'>
                    Agregar una clase
                  </span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <ViewLearningGoalsDialog
        open={openLearningObjetives}
        handleClose={() => setOpenLearningObjetives(false)}
        currentUnit={selectedUnit}
      />
    </div>
  );
};

export default SubjectActivities;

import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SortIcon from '@mui/icons-material/Sort';
import { useContext, useEffect, useState } from 'react';
import ViewLearningGoalsDialog from 'components/Modals/ViewLearningGoalsDialog';
import { type IUnit } from 'components/Modals/ViewLearningGoalsDialog/interfaces';
import { useQuery } from '@tanstack/react-query';
import { CircularProgress } from '@mui/material';
import { useSubjectStore } from 'zustand/subject-store';
import { FetchStatus } from 'global/enums';
import { type AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';
import { getUnitsBySubject } from 'services/units';
import LessonsIcon from 'assets/images/book.png';
import { useClassContext } from 'routes/Class/context';

const SubjectActivities: React.FC = () => {
  const [openLearningObjetives, setOpenLearningObjetives] =
    useState<boolean>(false);
  const { classroomDetails } = useClassContext();
  const [selectedUnit, setSelectedUnit] = useState<IUnit>();
  const [units, setUnits] = useState<IUnit[]>();
  const [isLoading, setIsLoading] = useState(FetchStatus.Idle);

  const getUnitsData = () => {
    setIsLoading(FetchStatus.Pending);
    try {
      if (classroomDetails?.subject_id) {
        getUnitsBySubject(classroomDetails.subject_id)
          .then((response: AxiosResponse) => {
            return response?.data;
          })
          .then((classroomsList: IUnit[]) => {
            setUnits(classroomsList);
            setIsLoading(FetchStatus.Success);
          })
          .catch((error) => {
            setIsLoading(FetchStatus.Error);
            console.error(error);
          });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUnitsData();
  }, [classroomDetails]);

  if (isLoading === FetchStatus.Pending || isLoading === FetchStatus.Idle)
    return (
      <div className='tw-flex tw-justify-center tw-items-center'>
        <CircularProgress />
      </div>
    );

  return (
    <div className='tw-space-y-6'>
      <div className='tw-flex tw-items-center tw-justify-between'>
        <h3 className='fw-bold tw-flex'>
          <img className='tw-mr-4' src={LessonsIcon} alt='icon' />
          Clases
        </h3>
        <button type='button' className='tw-text-sm tw-bg-indigo-600'>
          Añadir unidad
        </button>
      </div>

      <div className='tw-flex tw-flex-col tw-gap-8'>
        {units
          ? units?.map((unit, index) => (
              <div key={index} className='tw-flex tw-flex-col'>
                <div className='tw-flex tw-justify-between tw-items-center'>
                  <div className='tw-flex tw-items-center tw-gap-2 tw-px-0 tw-py-0 hover:tw-border-transparent'>
                    <h4 className='tw-text-lg tw-font-semibold'>
                      {'Unidad ' + unit.title || '?'}
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
                    onClick={() => {
                      setSelectedUnit(unit);
                      setOpenLearningObjetives(true);
                    }}
                    type='button'
                    className='tw-text-sm tw-bg-transparent tw-font-bold tw-text-indigo-600'
                  >
                    <SortIcon className='tw-mr-2' />
                    Objetivos de aprendizaje
                  </button>
                </div>
                <hr />
                <div className='tw-grid tw-grid-cols-4 tw-gap-4'>
                  {Array(4)
                    .fill(0)
                    .map((_, index) => (
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
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Enim exercitationem porro quasi, nesciunt, hic
                          nihil saepe, illum ex tempora quae est! Ipsum porro
                          suscipit accusamus doloremque ut, dolores optio id.
                        </p>
                      </div>
                    ))}
                  <div className='tw-border tw-border-dashed tw-rounded-md tw-h-40 tw-flex tw-justify-center tw-items-center tw-flex-col hover:tw-cursor-pointer tw-transition-all tw-duration-200 tw-ease-in-out tw-bg-transparent hover:tw-bg-indigo-100'>
                    <AddCircleOutlinedIcon />
                    <span className='tw-text-sm tw-font-semibold'>
                      Agregar una clase
                    </span>
                  </div>
                </div>
              </div>
            ))
          : 'No Data'}
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

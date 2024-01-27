import React, { useState, useEffect } from 'react';
import { Navigate, useOutletContext, useParams } from 'react-router-dom';
import { FetchStatus } from 'global/enums';
import { CircularProgress } from '@mui/material';
import Toaster from 'utils/Toster';
import { IClass, IAdventure, type IMission, IStage } from 'global/interfaces';
import AdventureWithProvider from './Adventure';
import {
  getMissionsByStage,
  type StageMissionUpdateBody,
} from 'api/services/missions';
import { StudentType } from 'components/StudentsList/interfaces';
import { useClassContext } from '../context';
import {
  getClassCurrentAdventure,
  setCurrentAdventure,
} from 'api/services/adventures';

const Adventures: React.FC = () => {
  const [loading, setLoading] = useState<FetchStatus>(FetchStatus.Success);
  const [missions, setMissions] = useState<IMission[]>([]);
  const { classDetails, students, loadingClass, updateStageData } =
    useClassContext();

  useEffect(() => {
    // FIXME: fix this eslint error
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getMissions();
  }, []);

  const handleUpdateCurrentAdventure = (
    missionData: IMission,
    ref: StageMissionUpdateBody
  ) => {
    /* setCurrentAdventure((prevState) => {
      if (prevState) {
        const tempData: IAdventure = JSON.parse(JSON.stringify(prevState));
        const { old_mission_id } = ref;
        const { missions } = tempData.stages[0];
        const index = missions.findIndex((res) => res.id === old_mission_id);
        if (index > -1) {
          missions[index] = missionData;
        }
        return tempData;
      }
      return prevState;
    }); */
  };

  /* const updateStagesData = (stage: IStage) => {
    if (stage) {

      /*setCurrentAdventure((prevState) => {
        if (prevState) {
          const tempData: IAdventure = JSON.parse(JSON.stringify(prevState));
          const { stages } = tempData;
          const index = stages.findIndex((res) => res.id === stage.id);
          if (index > -1) {
            stages[index] = stage;
          }
          return tempData;
        }
        return prevState;
      });
    }
  }; */

  const getMissions = async () => {
    try {
      const {
        data: { responseData },
      }: { data: { responseData: IMission[] } } = await getMissionsByStage();

      setMissions(responseData);
    } catch (error: any) {
      console.error(error);
      Toaster('error', 'Hubo un error al cargar las misiones');
    }
  };

  if (loadingClass !== FetchStatus.Success)
    return (
      <div className='d-flex w-100 align-items-center justify-content-center'>
        <CircularProgress />
      </div>
    );

  if (!classDetails?.current_adventure && loadingClass === FetchStatus.Success)
    return <Navigate to='iniciar' />;

  return (
    <AdventureWithProvider
      // FIXME: fix this ts error
      // @ts-expect-error ts-error(18048)
      classHasAdventure={classDetails.current_adventure}
      missions={missions}
      students={students}
      handleUpdateCurrentAdventure={handleUpdateCurrentAdventure}
      updateStageData={updateStageData}
    />
  );
};

export default Adventures;

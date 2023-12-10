import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { DashboardContainer, DetailsCard } from './styled';
import ClassDetailsCard from 'components/ClassDetailsCard';
import { type IClass } from 'global/interfaces';
import StudentsList from 'components/StudentsList';
import { type StudentType } from 'components/StudentsList/interfaces';
import EmotionalThermometer from 'components/EmotionalThermometer';
import { type Levels } from 'components/Modals/CreateClassModal/interfaces';
import { useOnboarding } from 'contexts/OnboardingContext';
import BoardOnboarding from 'utils/Onboardings/BoardOnboarding';
import StudentListOnboarding from 'utils/Onboardings/StudentListOnboarding';
import EmotionalThermometerOnboarding from 'utils/Onboardings/EmotionalThermometerOnboarding';
import { useTour } from '@reactour/tour';

const Board: React.FC = () => {
  const { classDetails, students, levels } = useOutletContext() as {
    classDetails: IClass;
    students: StudentType[];
    levels: Levels[];
  };
  const [onboardingDone, setOnboardingDone] = useState(true);
  const { setIsOpen, setSteps, setCurrentStep } = useTour();
  const { setNewAvailableTours } = useOnboarding();

  useEffect(() => {
    const rawOnboardingData = localStorage.getItem('onboarding-data');
    const onboardingData = JSON.parse(rawOnboardingData);
    setOnboardingDone(!!onboardingData?.tablero);
  }, []);

  useEffect(() => {
    setNewAvailableTours([
      {
        name: 'El Tablero del curso',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        steps: BoardOnboarding,
      },
      {
        name: 'Gestión de estudiantes',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        steps: StudentListOnboarding,
      },
      {
        name: 'El Termómetro Socioemocional',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        steps: EmotionalThermometerOnboarding,
      },
    ]);
  }, []);

  useEffect(() => {
    if (!onboardingDone) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      setSteps(BoardOnboarding);
      setCurrentStep(0);
      setIsOpen(true);
    }
  }, [onboardingDone]);

  return (
    <DashboardContainer className='d-flex w-100 row'>
      <div className='d-flex flex-column col-lg-6 col-12 pe-lg-3 pb-lg-0 pb-3 '>
        <DetailsCard className='mb-3' id='board-onboarding-1'>
          {classDetails && (
            <ClassDetailsCard classDetails={classDetails} levels={levels} />
          )}
        </DetailsCard>
        <DetailsCard className='p-5' id='board-onboarding-3'>
          <EmotionalThermometer classDetails={classDetails} />
        </DetailsCard>
      </div>
      <div className='col-lg-6 col-12' id='board-onboarding-2'>
        <DetailsCard className='h-100 p-5'>
          <StudentsList studentsData={students} classDetails={classDetails} />
        </DetailsCard>
      </div>
    </DashboardContainer>
  );
};

export default Board;

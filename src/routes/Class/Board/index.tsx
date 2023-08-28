import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { DashboardContainer, DetailsCard } from './styled';
import ClassDetailsCard from 'components/ClassDetailsCard';
import { IClass } from 'global/interfaces';
import StudentsList from 'components/StudentsList';
import { StudentType } from 'components/StudentsList/interfaces';
import EmotionalThermometer from 'components/EmotionalThermometer';
import { Levels } from 'components/Modals/CreateClassModal/interfaces';
import { useOnboarding } from 'contexts/OnboardingContext';
import BoardOnboarding from 'utils/Onboardings/BoardOnboarding';
import StudentListOnboarding from 'utils/Onboardings/StudentListOnboarding';
import EmotionalThermometerOnboarding from 'utils/Onboardings/EmotionalThermometerOnboarding';

const Board: React.FC = () => {
  const { classDetails, students, levels } = useOutletContext() as {
    classDetails: IClass;
    students: StudentType[];
    levels: Levels[];
  };

  const { setNewAvailableTours } = useOnboarding();

  useEffect(() => {
    setNewAvailableTours([{
      name: 'El Tablero del curso',
      steps: BoardOnboarding,
    }, {
      name: 'Gestión de estudiantes',
      steps: StudentListOnboarding,
    }, {
      name: 'El Termómetro Socioemocional',
      steps: EmotionalThermometerOnboarding,
    }]);
  }, []);

  return (
    <DashboardContainer className="d-flex w-100 row">
      <div className="d-flex flex-column col-lg-6 col-12 pe-lg-3 pb-lg-0 pb-3 ">
        <DetailsCard className="mb-3" id="board-onboarding-1">
          {classDetails && (
            <ClassDetailsCard classDetails={classDetails} levels={levels} />
          )}
        </DetailsCard>
        <DetailsCard className="p-5" id="board-onboarding-3">
          <EmotionalThermometer classDetails={classDetails} />
        </DetailsCard>
      </div>
      <div className="col-lg-6 col-12" id="board-onboarding-2">
        <DetailsCard className="h-100 p-5">
          <StudentsList studentsData={students} classDetails={classDetails} />
        </DetailsCard>
      </div>
    </DashboardContainer>
  );
};

export default Board;

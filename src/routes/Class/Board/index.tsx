import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { DashboardContainer, DetailsCard } from './styled';
import ClassDetailsCard from 'components/ClassDetailsCard';
import { ClassInterface } from 'services/classes/interfaces';
import StudentsList from 'components/StudentsList';
import { StudentType } from 'components/StudentsList/interfaces';
import EmotionalThermometer from 'components/EmotionalThermometer';
import { Levels } from 'components/Modals/CreateClassModal/interfaces';

const Board: React.FC = () => {
  const { classDetails, students, levels } = useOutletContext() as {
    classDetails: ClassInterface;
    students: StudentType[];
    levels: Levels[];
  };

  return (
    <DashboardContainer className="d-flex w-100 row">
      <div className="d-flex flex-column col-lg-6 col-12 pe-lg-3 pb-lg-0 pb-3 ">
        <DetailsCard className="mb-3">
          {classDetails && <ClassDetailsCard classDetails={classDetails} levels={levels} />}
        </DetailsCard>
        <DetailsCard className="p-5">
          <EmotionalThermometer classDetails={classDetails} />
        </DetailsCard>
      </div>
      <div className="col-lg-6 col-12">
        <DetailsCard className="h-100 p-5">
          <StudentsList studentsData={students} classDetails={classDetails} />
        </DetailsCard>
      </div>
    </DashboardContainer>
  );
};

export default Board;

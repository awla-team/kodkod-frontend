import { type FC } from 'react';
import WelcomePage from './WelcomePage';
import MyClasses from './MyClasses';
import { useOutletContext } from 'react-router-dom';
import { type ITeacherSubjectClassroom, type IClass } from 'global/interfaces';
import { type Levels } from 'components/Modals/CreateClassModal/interfaces';

const HomePage: FC = () => {
  // const { user } = useAuth();
  // const [onboardingDone, setOnboardingDone] = useState(true);
  // const { setNewAvailableTours } = useOnboarding();
  // const { setIsOpen, setSteps, setCurrentStep } = useTour();
  const { classrooms, levels, handleOpenModal, getClassroomsData } =
    useOutletContext() as {
      classrooms: ITeacherSubjectClassroom[];
      levels: Levels[];
      handleOpenModal: () => void;
      getClassroomsData: () => void;
    };

  // useEffect(() => {
  //   let rawOnboardingData: string | null = '';
  //   if (user?.completed_onboarding) {
  //     localStorage.setItem('onboarding-data', user.completed_onboarding);
  //     rawOnboardingData = user.completed_onboarding;
  //   } else {
  //     rawOnboardingData = localStorage.getItem('onboarding-data');
  //   }
  //   if (rawOnboardingData !== null) {
  //     const onboardingData = JSON.parse(rawOnboardingData);
  //     setOnboardingDone(!!onboardingData?.app);
  //   } else {
  //     setOnboardingDone(false);
  //   }
  // }, [user?.completed_onboarding]);

  // useEffect(() => {
  //   // FIXME: fix this ts error
  //   // @ts-expect-error ts-error(2722)
  //   setNewAvailableTours([
  //     {
  //       name: 'Creación de cursos',
  //       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //       // @ts-expect-error
  //       steps: HomeOnboarding,
  //     },
  //   ]);
  // }, []);

  // useEffect(() => {
  //   if (!onboardingDone) {
  //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //     // @ts-expect-error
  //     setSteps(HomeOnboarding);
  //     setCurrentStep(0);
  //     setIsOpen(true);
  //   }
  // }, [onboardingDone]);

  return (
    <div className='d-flex w-100'>
      {!classrooms?.length ? (
        <WelcomePage handleOpenModal={handleOpenModal} />
      ) : (
        <MyClasses
          classrooms={classrooms}
          levels={levels}
          getClassroomsData={getClassroomsData}
        />
      )}
    </div>
  );
};

export default HomePage;

import { type FC, useEffect, useState } from 'react';
import WelcomePage from './WelcomePage';
import MyClasses from './MyClasses';
import { useOutletContext } from 'react-router-dom';
import { type ModifiedIClass } from 'global/interfaces';
import { useOnboarding } from 'contexts/OnboardingContext';
import HomeOnboarding from 'utils/Onboardings/HomeOnboarding';
import { useTour } from '@reactour/tour';

const HomePage: FC = () => {
  const [onboardingDone, setOnboardingDone] = useState(true);
  const { setNewAvailableTours } = useOnboarding();
  const { setIsOpen, setSteps, setCurrentStep } = useTour();
  const { classes, handleOpenModal, getClassesData } = useOutletContext() as {
    classes: ModifiedIClass[];
    handleOpenModal: () => void;
    getClassesData: () => void;
  };

  useEffect(() => {
    const rawOnboardingData = localStorage.getItem('onboarding-data');
    // FIXME: fix this ts error
    // @ts-expect-error ts-error(2345)
    const onboardingData = JSON.parse(rawOnboardingData);
    setOnboardingDone(!!onboardingData?.app);
  }, []);

  useEffect(() => {
    // FIXME: fix this ts error
    // @ts-expect-error ts-error(2722)
    setNewAvailableTours([
      {
        name: 'Creación de cursos',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        steps: HomeOnboarding,
      },
    ]);
  }, []);

  useEffect(() => {
    if (!onboardingDone) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      setSteps(HomeOnboarding);
      setCurrentStep(0);
      setIsOpen(true);
    }
  }, [onboardingDone]);

  return (
    <div className='d-flex w-100'>
      {!classes?.length ? (
        <WelcomePage handleOpenModal={handleOpenModal} />
      ) : (
        <MyClasses classes={classes} getClassesData={getClassesData} />
      )}
    </div>
  );
};

export default HomePage;

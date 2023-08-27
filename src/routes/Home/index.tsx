import { FC, useEffect } from 'react';
import WelcomePage from './WelcomePage';
import MyClasses from './MyClasses';
import { useOutletContext } from 'react-router-dom';
import { ModifiedIClass } from 'global/interfaces';
import { useTour } from '@reactour/tour';
import { HomeOnboarding } from 'utils/Onboardings/HomeOnboarding';

const HomePage: FC = () => {
  const { setIsOpen, setSteps } = useTour();
  const { classes, handleOpenModal, getClassesData } = useOutletContext() as {
    classes: Array<ModifiedIClass>;
    handleOpenModal: () => void;
    getClassesData: () => void;
  };

  useEffect(() => {
    setSteps(HomeOnboarding);
    setIsOpen(true);
  }, []);

  return (
    <div className="d-flex w-100">
      {!classes?.length ? (
        <WelcomePage handleOpenModal={handleOpenModal} />
      ) : (
        <MyClasses classes={classes} getClassesData={getClassesData} />
      )}
    </div>
  )
};

export default HomePage;

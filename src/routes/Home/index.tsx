import { FC, useEffect } from 'react';
import WelcomePage from './WelcomePage';
import MyClasses from './MyClasses';
import { useOutletContext } from 'react-router-dom';
import { ModifiedIClass } from 'global/interfaces';
import { useOnboarding } from 'contexts/OnboardingContext';
import HomeOnboarding from 'utils/Onboardings/HomeOnboarding';

const HomePage: FC = () => {
  const { setNewAvailableTours } = useOnboarding();
  const { classes, handleOpenModal, getClassesData } = useOutletContext() as {
    classes: Array<ModifiedIClass>;
    handleOpenModal: () => void;
    getClassesData: () => void;
  };

  useEffect(() => {
    setNewAvailableTours([
      {
        name: 'Creación de cursos',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        steps: HomeOnboarding,
      },
    ]);
  }, []);

  return (
    <div className="d-flex w-100">
      {!classes?.length ? (
        <WelcomePage handleOpenModal={handleOpenModal} />
      ) : (
        <MyClasses classes={classes} getClassesData={getClassesData} />
      )}
    </div>
  );
};

export default HomePage;

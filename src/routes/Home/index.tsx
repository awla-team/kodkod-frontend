import { FC } from 'react';
import WelcomePage from './WelcomePage';
import MyClasses from './MyClasses';
import { useOutletContext } from 'react-router-dom';
import { IClass } from 'global/interfaces';

const HomePage: FC = () => {
  const { classes, handleOpenModal, getClassesData } = useOutletContext() as {
    classes: Array<IClass>;
    handleOpenModal: () => void;
    getClassesData: () => void;
  };

  return !classes?.length ? (
    <WelcomePage handleOpenModal={handleOpenModal} />
  ) : (
    <MyClasses classes={classes} getClassesData={getClassesData} />
  );
};

export default HomePage;

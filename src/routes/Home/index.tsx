import type { FC } from "react";
import WelcomePage from "./WelcomePage";
import MyClasses from "./MyClasses";
import { useOutletContext } from "react-router-dom";
import { ClassInterface } from "services/classes/interfaces";

const HomePage: FC = () => {
  const { classes, handleOpenModal } = useOutletContext() as {
    classes: Array<ClassInterface>;
    handleOpenModal: () => void;
  };
  return !classes.length ? (
    <WelcomePage handleOpenModal={handleOpenModal} />
  ) : (
    <MyClasses classes={classes} />
  );
};

export default HomePage;

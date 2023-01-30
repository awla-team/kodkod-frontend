import type { FC } from "react";
import WelcomePage from "./WelcomePage";
import MyClasses from "./MyClasses";
import { useOutletContext } from "react-router-dom";
import { ClassInterface } from "../../services/classes/interfaces";

const HomePage: FC = () => {
  const { classes } = useOutletContext() as { classes: Array<ClassInterface> };
  return !classes.length ? <WelcomePage /> : <MyClasses classes={classes} />;
};

export default HomePage;

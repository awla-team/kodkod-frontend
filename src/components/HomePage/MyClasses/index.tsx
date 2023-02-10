import type { FC } from "react";
import styled from "styled-components";
import { Box } from "@mui/material";
import { MyClassesProps } from "./interfaces";
import { Link as RouterLink } from "react-router-dom";
import { useMemo, Fragment } from "react";

const MyClasses: FC<MyClassesProps> = ({ classes }: MyClassesProps) => {
  const classesData = useMemo(() => {
    const totalLevel = [...new Set(classes.map((res) => res.level))].sort();
    return totalLevel.map((classLevel) => ({
      level: classLevel,
      classes: classes.filter((classData) => classLevel === classData.level),
    }));
  }, [classes]);
  return (
    <MyClassesContainer>
      <h1 className={"header__text"}>My classes</h1>
      {classesData.map(({ level, ...rest }, index) => {
        return (
          <div key={index} className={"mb-3"}>
            <div className={"class__level"}>
              <span className={"class__level__text"}>{`${level}° Medio`}</span>
            </div>
            <div className={"class__level__cards__container"}>
              {rest.classes.map((teacherClass, _index) => {
                return (
                  <RouterLink
                    key={`${_index}-${index}`}
                    to={`cursos/${teacherClass.id}/tablero`}
                  >
                    <div className={"class__level__card"}>
                      <h1 className={"header__text"}>{teacherClass.alias}</h1>
                      <span className={"class__status"}>
                        No ongoing adventures
                      </span>
                    </div>
                  </RouterLink>
                );
              })}
            </div>
          </div>
        );
      })}
    </MyClassesContainer>
  );
};

export default MyClasses;

const MyClassesContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  padding-block: 1rem;

  & a {
    color: #000;
    text-decoration: none;
    font-weight: normal;
  }

  & .header__text {
    font-weight: 700;
    font-size: 3rem;
  }

  & .class__level {
    & .class__level__text {
      font-weight: 700;
      font-size: 1.25rem;
    }

    border-bottom: 1px solid #1e1e1e;
  }

  & .class__level__cards__container {
    margin-block-start: 1rem;
    display: grid;
    grid-auto-flow: row;
    grid-template-columns: repeat(auto-fill, minmax(0px, 304px));
    gap: 1rem;
    grid-gap: 1rem;

    & .class__level__card {
      background: #8a8a8a;
      border-radius: 8px;
      padding: 1.5rem;
      min-height: 194px;
      color: #ffffff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 0.5rem;

      & .header__text {
        font-weight: 700;
        font-size: 3rem;
      }
    }
  }
`;

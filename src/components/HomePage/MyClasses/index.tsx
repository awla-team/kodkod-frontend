import type { FC } from "react";
import styled from "styled-components";
import { Box } from "@mui/material";
import { MyClassesProps } from "./interfaces";
import { Link as RouterLink } from "react-router-dom";

const MyClasses: FC<MyClassesProps> = ({ classes }: MyClassesProps) => {
  return (
    <MyClassesContainer>
      <h1 className={"header__text"}>My classes</h1>
      <div className={"class__level"}>
        <span className={"class__level__text"}>3° Medio</span>
      </div>
      <div className={"class__level__cards__container"}>
        {classes.map((teacherClass, index) => {
          return (
            <RouterLink key={index} to={`cursos/${teacherClass.id}/tablero`}>
              <div className={"class__level__card"}>
                <h1 className={"header__text"}>{teacherClass.title}</h1>
                <span className={"class__status"}>No ongoing adventures</span>
              </div>
            </RouterLink>
          );
        })}
      </div>
    </MyClassesContainer>
  );
};

export default MyClasses;

const MyClassesContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  margin-block-start: 4rem;

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

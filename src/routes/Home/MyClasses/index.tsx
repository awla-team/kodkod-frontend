import type { FC } from "react";
import styled from "styled-components";
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import { MyClassesProps } from "./interfaces";
import { Link as RouterLink } from "react-router-dom";
import { useMemo, Fragment } from "react";
import { ExpandMore } from "@mui/icons-material";

const MyClasses: FC<MyClassesProps> = ({ classes }: MyClassesProps) => {
  const classesData = useMemo(() => {
    const totalLevel = [...new Set(classes.map((res) => res.level))].sort();
    return totalLevel.map((classLevel) => ({
      level: classLevel,
      classes: classes.filter((classData) => classLevel === classData.level),
    }));
  }, [classes]);

  return (
    <MyClassesContainer className="p-5">
      <Typography component="h1" variant="h4" className="fw-bold mb-1">Mis cursos</Typography>
      <Typography component="span" variant="body2" color="primary" className="fw-bold mb-4">{`${classes.length} cursos en total`}</Typography>
      {classesData.map(({ level, ...rest }, index) => {
        return (          
          <LevelAccordion defaultExpanded disableGutters elevation={0} key={index}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography component="span" variant="body1" className="fw-bold">{level}</Typography>
            </AccordionSummary>
            <AccordionDetails className={"class__level__cards__container row"}>              
              {rest.classes.map((teacherClass, _index) => {
                return (
                  <div className="col-3">
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
                  </div>                    
                );
              })}
            </AccordionDetails>
          </LevelAccordion>
        );
      })}
    </MyClassesContainer>
  );
};

export default MyClasses;

const LevelAccordion = styled(Accordion)`  
  .MuiAccordionSummary-root  {
    margin: 0;
    padding: 0;
    min-height: 0;
  }
  .MuiAccordionDetails-root {
    margin: 0;
    padding: 0;
  }
`;

const MyClassesContainer = styled(Box)`
  display: flex;
  flex-direction: column;    
  background: #FFF;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 8px;

  & a {
    color: #000;
    text-decoration: none;
    font-weight: normal;
  }

  & .class__level {
    & .class__level__text {      
      font-size: 1.25rem;
    }
  }

  & .class__level__cards__container {
    display: flex;
    &:last-child {
      margin-bottom: 24px;
    }    

    & .class__level__card {
      background: #8a8a8a;
      border-radius: 8px;
      padding: 1.5rem;
      min-height: 194px;
      color: #ffffff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-bottom: 24px;      

      & .header__text {
        font-weight: 700;
        font-size: 3rem;
      }
    }
  }
`;

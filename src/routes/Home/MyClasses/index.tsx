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
                  <div className="col-3" key={`${_index}-${index}`}>
                    <RouterLink                      
                      to={`cursos/${teacherClass.id}/tablero`}
                    >
                      <div className={"class__level__card"}>
                        <div className="class-img-container" />
                        <div className="p-4 py-5">
                          <Typography component="h4" variant="h4" fontWeight="bold" className="mb-2">{teacherClass.alias}</Typography>
                          <Typography component="span" variant="body1">Sin aventuras en curso</Typography>                          
                        </div>                        
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
  width: 100%;
  height: fit-content;
  background: #FFF;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 8px;

  .class-img-container {
    background: lightgray;
    border: none;
    border-radius: 8px 8px 0px 0px;
    height: 100px;
    transition: all 0.3s ease;
  }

  & a {
    color: #000;
    text-decoration: none;
    font-weight: normal;
  }

  & .class__level__cards__container {
    display: flex;
    &:last-child {
      margin-bottom: 24px;
    }    

    & .class__level__card {      
      border-radius: 8px;      
      min-height: 194px;      
      display: flex;
      flex-direction: column;      
      margin-bottom: 24px;
      transition: all 0.3s ease;
      box-shadow: 0 0 2px rgba(33, 33, 33, 0.6);
      border: 1px solid transparent;

      &:hover {
        color: ${(props) => props.theme.palette.primary.dark};
        border: 1px solid ${(props) => props.theme.palette.primary.dark};

        .class-img-container {
          background-color: gray;
        }
      }
    }
  }
`;

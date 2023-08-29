import type { FC } from 'react';
import {
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@mui/material';
import { MyClassesProps } from './interfaces';
import { useMemo, useEffect } from 'react';
import { ExpandMore, South } from '@mui/icons-material';
import ClassCard from 'components/ClassCard';
import { MyClassesBox, LevelAccordion, MyClassesContainer } from './styled';

const MyClasses: FC<MyClassesProps> = ({
  classes,
  getClassesData,
}: MyClassesProps) => {
  const classesData = useMemo(() => {
    const totalLevel = [...new Set(classes.map((res) => res.level))].sort();

    return totalLevel.map((classLevel) => ({
      level: classLevel,
      classes: classes.filter((classData) => classLevel === classData.level),
    }));
  }, [classes]);

  useEffect(() => {
    getClassesData();
  }, []);

  return (
    <MyClassesContainer className="w-100">
      <MyClassesBox className="p-5">
        <Typography
          component="h1"
          variant="h4"
          className="fw-bold mb-1"
          id="home-onboarding-4"
        >
          Mis cursos
        </Typography>
        <Typography
          component="span"
          variant="body2"
          color="primary"
          className="fw-bold mb-4"
        >{`${classes.length} cursos en total`}</Typography>
        {classesData.map(({ level, ...rest }, index) => {
          return (
            <LevelAccordion
              defaultExpanded
              disableGutters
              elevation={0}
              key={index}
            >
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography
                  component="span"
                  variant="body1"
                  className="fw-bold"
                >
                  {level}
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                className={'class__level__cards__container row'}
              >
                {rest.classes.map((teacherClass, _index) => (
                  <div
                    className="col-lg-4 col-md-6 col-12"
                    key={`${_index}-${index}`}
                  >
                    <ClassCard classObj={teacherClass} />
                  </div>
                ))}
              </AccordionDetails>
            </LevelAccordion>
          );
        })}
      </MyClassesBox>
    </MyClassesContainer>
  );
};

export default MyClasses;

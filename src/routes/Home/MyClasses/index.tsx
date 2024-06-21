import type { FC } from 'react';
import {
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Typography,
} from '@mui/material';
import { type MyClassesProps } from './interfaces';
import { useMemo, useEffect } from 'react';
import { ExpandMore, South } from '@mui/icons-material';
import ClassCard from 'components/ClassCard';
import { MyClassesBox, LevelAccordion, MyClassesContainer } from './styled';
import ClassroomIcon from 'assets/images/desk.png';

const MyClasses: FC<MyClassesProps> = ({
  classes,
  classrooms,
  levels,
  getClassesData,
}: MyClassesProps) => {
  const classesData = useMemo(() => {
    const totalLevel = [
      ...new Set(classes.map((res) => (res.id_level ? res.id_level : 0))),
    ].sort((a, b) => a - b);

    return totalLevel.map((classLevel) => ({
      level: classLevel,
      classes: classes.filter((classData) => classLevel === classData.id_level),
    }));
  }, [classes]);

  useEffect(() => {
    getClassesData();
  }, []);

  if (classrooms && classrooms.length > 0) {
    return (
      <MyClassesContainer className='w-100'>
        <MyClassesBox className='p-5'>
          <Typography
            component='h1'
            variant='h4'
            className='fw-bold mb-1 tw-flex'
            id='home-onboarding-4'
          >
            <img className='tw-w-10 tw-mr-4' src={ClassroomIcon} alt='icon' />
            Cursos
          </Typography>
          {levels
            .filter((level) =>
              classrooms.find((value) => value.classroom.level_id === level.id)
            )
            .map(({ id, name }) => {
              return (
                <LevelAccordion
                  defaultExpanded
                  disableGutters
                  elevation={0}
                  key={id}
                >
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography component='span' variant='h5' className=''>
                      {name}
                    </Typography>
                  </AccordionSummary>
                  <Divider variant='middle' color='black' className='mb-4' />
                  <AccordionDetails className='class__level__cards__container row'>
                    {classrooms
                      .filter(
                        (teacherClass, _index) =>
                          teacherClass.classroom.level_id === id
                      )
                      .map((teacherClass, _index) => (
                        <div
                          className='col-lg-4 col-md-6 col-12'
                          key={`${_index}`}
                        >
                          <ClassCard classroom={teacherClass} />
                        </div>
                      ))}
                  </AccordionDetails>
                </LevelAccordion>
              );
            })}
        </MyClassesBox>
      </MyClassesContainer>
    );
  }

  if (classes.length === 0) {
    <MyClassesContainer className='w-100'>
      <MyClassesBox className='p-5'>
        <Typography
          component='h1'
          variant='h4'
          className='fw-bold mb-1 tw-flex'
          id='home-onboarding-4'
        >
          <img className='tw-w-10 tw-mr-4' src={ClassroomIcon} alt='icon' />
          Cursos
        </Typography>
      </MyClassesBox>
    </MyClassesContainer>;
  }

  return (
    <MyClassesContainer className='w-100'>
      <MyClassesBox className='p-5'>
        <Typography
          component='h1'
          variant='h4'
          className='fw-bold mb-1 tw-flex'
          id='home-onboarding-4'
        >
          <img className='tw-w-10 tw-mr-4' src={ClassroomIcon} alt='icon' />
          Cursos
        </Typography>
        {levels
          .filter((level) =>
            classes.find((value) => value.id_level === level.id)
          )
          .map(({ id, name }) => {
            return (
              <LevelAccordion
                defaultExpanded
                disableGutters
                elevation={0}
                key={id}
              >
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography component='span' variant='h5' className=''>
                    {name}
                  </Typography>
                </AccordionSummary>
                <Divider variant='middle' color='black' className='mb-4' />
                <AccordionDetails className='class__level__cards__container row'>
                  {classes
                    .filter(
                      (teacherClass, _index) => teacherClass.id_level === id
                    )
                    .map((teacherClass, _index) => (
                      <div
                        className='col-lg-4 col-md-6 col-12'
                        key={`${_index}`}
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

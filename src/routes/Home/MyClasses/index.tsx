import type { FC } from 'react';
import { AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { type MyClassesProps } from './interfaces';
import { ExpandMore } from '@mui/icons-material';
import ClassCard from 'components/ClassCard';
import { MyClassesBox, LevelAccordion } from './styled';
import ClassroomIcon from 'assets/images/blackboard.png';

const MyClasses: FC<MyClassesProps> = ({ classrooms, levels }) => {
  return (
    <div className='w-100'>
      <MyClassesBox className='tw-p-10 tw-border tw-border-solid tw-border-gray-200'>
        <div className='tw-flex tw-items-center tw-justify-between tw-mb-8'>
          <div className='tw-flex tw-items-end tw-gap-4'>
            <img src={ClassroomIcon} alt='Mis cursos' className='tw-w-10' />
            <h2 className='tw-font-bold tw-mb-0'>Mis cursos</h2>
          </div>
        </div>
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
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  className='tw-border-b tw-border-gray-300 tw-border-solid'
                >
                  <Typography component='span' variant='h6' className=''>
                    {name}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className='class__level__cards__container row tw-py-5'>
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
    </div>
  );
};

export default MyClasses;

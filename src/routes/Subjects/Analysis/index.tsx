import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import KpiBox from 'components/KpiBox';
import { useClassContext } from 'routes/Class/context';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import StudentAnalysisList from 'components/StudentAnalysisList';
import MotivationScale from 'components/MotivationScale';
import analytics from 'assets/images/analytics_1.png';
import highFive from 'assets/images/high-five.png';
import studentGroup from 'assets/images/student_group.png';
import warning from 'assets/images/warning.png';
import { useMutation } from '@tanstack/react-query';
import http from 'global/api';
import type AnalysisData from 'types/api/analysis-data';
import moment from 'moment';
import CircularProgress from '@mui/material/CircularProgress';

const Analysis = () => {
  const { classroomDetails } = useClassContext();
  const [buttonActive, setButtonActive] = useState<number>(1);
  const { classId } = useParams();

  // TODO: fetch data when date range changes
  const {
    mutate: getAnalysis,
    data: response,
    isPending,
  } = useMutation({
    mutationKey: ['analysis', classId],
    mutationFn: async ({
      startDate,
      endDate,
    }: {
      startDate: string;
      endDate: string;
    }) =>
      await http.get<AnalysisData>(
        `/report?teacher_subject_classroom_id=${classId}&start_date=${startDate}&end_date=${endDate}`
      ),
  });

  useEffect(() => {
    getAnalysis({ startDate: '2021-10-01', endDate: '2021-10-31' });
  }, [getAnalysis]);

  const onChagenDateRange = (
    index: number,
    startDate: string,
    endDate: string
  ) => {
    setButtonActive(index);
    getAnalysis({ startDate, endDate });
  };

  return (
    <div className='tw-space-y-10'>
      <div className='tw-flex tw-items-center tw-justify-between'>
        <div className='tw-flex tw-items-center tw-gap-2'>
          <img
            src={analytics}
            alt='analysis'
            className='tw-w-10 tw-object-cover'
          />
          <h2 className='tw-font-bold tw-mb-0'>Análisis del curso</h2>
        </div>
      </div>
      {/* Información del curso y profesor */}
      <div className='tw-flex tw-gap-10'>
        <h4 className='tw-flex'>
          <h4 className='tw-mr-2'>Curso: </h4>
          <b>{classroomDetails?.classroom.title}</b>
        </h4>
        <h4 className='tw-flex'>
          <h4 className='tw-mr-2 tw-font-normal'>Asignatura: </h4>
          <b className='tw-font-bold'>{classroomDetails?.subject?.title}</b>
        </h4>
        <h4 className='tw-flex '>
          <h4 className='tw-mr-2'>Profesor: </h4>
          <b>
            {classroomDetails?.teacher.first_name +
              ' ' +
              classroomDetails?.teacher.last_name}
          </b>
        </h4>
      </div>
      {/** Buttons Section */}
      <div className='tw-flex tw-justify-between'>
        <div>
          <Button className='tw-border tw-border-solid tw-gap-1'>
            <PictureAsPdfIcon />
            <b>Descargar Informe</b>
          </Button>
        </div>
        <div className='tw-flex tw-border tw-border-solid tw-rounded tw-text-primary-500'>
          <Button
            onClick={() =>
              onChagenDateRange(
                1,
                moment().subtract(7, 'days').format('YYYY-MM-DD'),
                moment().format('YYYY-MM-DD')
              )
            }
            className={`tw-border tw-rounded-none tw-px-4 tw-py-1 ${
              buttonActive === 1
                ? 'tw-bg-primary-500 tw-border-primary-500 tw-text-white tw-font-bold'
                : ''
            }`}
          >
            Ultimos 7 dias
          </Button>
          <Button
            onClick={() =>
              onChagenDateRange(
                2,
                moment().subtract(30, 'days').format('YYYY-MM-DD'),
                moment().format('YYYY-MM-DD')
              )
            }
            className={` tw-border-solid tw-rounded-none tw-px-4 tw-py-1 ${
              buttonActive === 2
                ? 'tw-bg-primary-500 tw-border-primary-500 tw-text-white tw-font-bold'
                : ''
            } `}
          >
            Ultimos 30 dias
          </Button>
          <Button
            onClick={() =>
              onChagenDateRange(
                3,
                moment().subtract(6, 'months').format('YYYY-MM-DD'),
                moment().format('YYYY-MM-DD')
              )
            }
            className={`tw-border-solid tw-rounded-none tw-px-4 tw-py-1 ${
              buttonActive === 3
                ? 'tw-bg-primary-500 tw-border-primary-500 tw-text-white tw-font-bold'
                : ''
            } `}
          >
            Semestre
          </Button>
        </div>
      </div>

      {isPending && <CircularProgress />}
      {!isPending && !response && (
        <div className='tw-flex tw-justify-center tw-items-center tw-h-96'>
          <h4 className='tw-text-center tw-text-2xl tw-font-bold'>
            No hay datos para mostrar
          </h4>
        </div>
      )}
      {!isPending && response && (
        <>
          {/** Motivation Section */}
          <MotivationScale
            motivationLevel={response.data.classroomData.kpi_motivation_level}
          />
          {/** KpiBox Section */}
          <div className='tw-flex tw-flex-col tw-w-full tw-gap-6 lg:tw-flex-row'>
            <KpiBox
              title='desafios completados'
              value={`${response.data.classroomData.kpi_total_activities}`}
              icon={<img src={highFive} alt='high-five' className='w-5 h-5' />}
            />
            <KpiBox
              title='nivel de participación'
              value={`${response.data.studentsData.length} Estudiantes`}
              icon={
                <img
                  src={studentGroup}
                  alt='student-group'
                  className='w-5 h-5'
                />
              }
              helperText='Test'
            />
            <KpiBox
              title='requieren atención'
              value={`${response.data.classroomData.kpi_alerts_level}%`}
              icon={<img src={warning} alt='warning' className='w-5 h-5' />}
            />
          </div>
          {/** Table Section */}
          <div>
            {response?.data.studentsData && (
              <StudentAnalysisList students={response?.data.studentsData} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Analysis;

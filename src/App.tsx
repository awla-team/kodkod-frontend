import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation, useParams } from 'react-router-dom';
import { Button, CircularProgress } from '@mui/material';
import Sidebar from './components/Sidebar';
import { type ITeacherSubjectClassroom } from 'global/interfaces';
import { type AxiosResponse } from 'axios';
import { FetchStatus } from 'global/enums';
import { CreateClassModal } from './components/Modals';
import { sortClassrooms } from './utils';
import { getAllTheLevel } from './services/levels';
import Toaster from './utils/Toster';
import { type Levels } from './components/Modals/CreateClassModal/interfaces';
import { useAuth } from './contexts/AuthContext';
import moment from 'moment';
import 'moment/dist/locale/es';
import './App.css';
import OnboardingContextProvider from 'contexts/OnboardingContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DoneIcon from '@mui/icons-material/Done';
import { TourProvider } from '@reactour/tour';
import { patchUserById } from 'services/users';
import { ModalContextProvider } from 'contexts/ZustandContext/modal-context';
import UserInfo from 'components/Sidebar/UserInfo';
import { useSubjectStore } from 'zustand/subject-store';
import { getTeacherSubjectClassroomByTeacherId } from 'services/teacher_subject_classroom';
import { useClassroomStore } from 'zustand/classroom-store';

moment.locale('es');

const App: React.FC = () => {
  const [classrooms, setClassrooms] = useState<ITeacherSubjectClassroom[]>([]);
  const [levels, setLevels] = useState<Levels[]>([]);
  const [fetching, setFetching] = useState<FetchStatus>(FetchStatus.Idle);
  const [createClassModalOpen, setCreateClassModalOpen] =
    useState<boolean>(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { classId, subjectId } = useParams();
  const { subject } = useSubjectStore();
  const { classroom } = useClassroomStore();

  const getClassroomsData = () => {
    try {
      if (user?.id) {
        getTeacherSubjectClassroomByTeacherId(user.id)
          .then((response: AxiosResponse) => {
            return response?.data;
          })
          .then((classroomsList: ITeacherSubjectClassroom[]) => {
            setClassrooms(classroomsList);
            setFetching(FetchStatus.Success);
          })
          .catch((error) => {
            setFetching(FetchStatus.Error);
            console.error(error);
          });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateOnboardingStatus = () => {
    const completed_onboarding = localStorage.getItem('onboarding-data') || '';
    if (user) {
      patchUserById(user?.id, { completed_onboarding })
        .then((response: AxiosResponse) => {
          return response?.data;
        })
        .catch((error: Error) => {
          setFetching(FetchStatus.Error);
          console.error(error);
        });
    }
  };

  const getLevels = async () => {
    try {
      const { data }: { data: { responseData: Levels[] } } =
        await getAllTheLevel();
      setLevels(
        data.responseData.sort((a, b) => {
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
          return 0;
        })
      );
    } catch (error: any) {
      console.error(error);
      Toaster('error', 'Hubo un error al cargar los niveles');
    }
  };

  const handleClose = (
    reason: 'backdropClick' | 'escapeKeyDown' | 'success',
    data?: ITeacherSubjectClassroom
  ) => {
    if (reason !== 'backdropClick') setCreateClassModalOpen(false);
    if (reason === 'success') {
      if (data) {
        setClassrooms((prevState) => {
          return sortClassrooms([...prevState, data]);
        });
      }
    }
  };

  const handleOpenModal = () => {
    setCreateClassModalOpen(true);
  };

  const handleFinish = () => {
    let currentView = location.pathname.match(/\/([^/]+)$/)[1];
    // FIXME: fix this eslint error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (!isNaN(currentView))
      currentView = location.pathname.match(/\/([^/]+)\/[^/]+$/)[1];

    const rawOnboardingData = localStorage.getItem('onboarding-data');
    // FIXME: fix this ts error
    // @ts-expect-error ts-error(2345): argument of type 'string | null' is not assignable to parameter of type 'string'
    const onboardingData = JSON.parse(rawOnboardingData) || {};
    onboardingData[currentView] = true;
    localStorage.setItem('onboarding-data', JSON.stringify(onboardingData));
    updateOnboardingStatus();
  };

  useEffect(() => {
    if (location.state) {
      const { deletedClass } = location.state;
      if (deletedClass) {
        setClassrooms((prevState) => {
          return prevState.filter((res) => res.id !== deletedClass);
        });
        navigate(location.pathname, {
          state: null,
          replace: true,
        });
      }
    }
  }, [navigate, location]);

  useEffect(() => {
    if (user) {
      setFetching(FetchStatus.Pending);
      // FIXME: fix this eslint error
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      getLevels();
      getClassroomsData();
    }
  }, [user]);

  if (fetching === FetchStatus.Idle || fetching === FetchStatus.Pending)
    return (
      <div className='app-container d-flex'>
        <div className='d-flex w-100 h-100 justify-content-center align-items-center'>
          <CircularProgress />
        </div>
      </div>
    );

  return (
    <TourProvider
      steps={[]}
      onClickMask={() => {}}
      onClickClose={({ setIsOpen }) => {
        setIsOpen(false);
        handleFinish();
      }}
      prevButton={({ setCurrentStep, currentStep }) => (
        <Button
          variant='outlined'
          className='me-2'
          size='small'
          startIcon={<ArrowBackIcon />}
          disabled={currentStep === 0}
          onClick={() => setCurrentStep(currentStep - 1)}
          color='primary'
        >
          Atrás
        </Button>
      )}
      nextButton={({ setIsOpen, setCurrentStep, currentStep, stepsLength }) => {
        if (currentStep === stepsLength - 1) {
          return (
            <Button
              variant='contained'
              className='ms-2'
              size='small'
              startIcon={<DoneIcon />}
              onClick={() => {
                setIsOpen(false);
                handleFinish();
              }}
              color='primary'
            >
              Finalizar
            </Button>
          );
        } else {
          return (
            <Button
              variant='outlined'
              className='ms-2'
              size='small'
              endIcon={<ArrowForwardIcon />}
              onClick={() => setCurrentStep(currentStep + 1)}
              color='primary'
            >
              Siguiente
            </Button>
          );
        }
      }}
    >
      <OnboardingContextProvider>
        <ModalContextProvider>
          <div className='app-container d-flex'>
            <Sidebar
              classrooms={classrooms}
              /* handleOpenModal={handleOpenModal} */
            />
            <div className='tw-flex tw-flex-col tw-w-full '>
              <header
                className={`tw-py-2 tw-flex tw-w-full tw-items-center ${
                  subject &&
                  classroom &&
                  location.pathname ===
                    `/app/cursos/${classId}/asignaturas/${subjectId}/clases`
                    ? 'tw-justify-between'
                    : 'tw-justify-end'
                } `}
              >
                {subject &&
                  classroom &&
                  location.pathname ===
                    `/app/cursos/${classId}/asignaturas/${subjectId}/clases` && (
                    <div className='tw-pl-4'>
                      <h4 className='tw-text-xs tw-mb-0'>
                        Curso seleccionado:
                      </h4>
                      <span className='tw-font-semibold'>
                        {classroom.title || '?'}- {subject.title || '?'}
                      </span>
                    </div>
                  )}
                <UserInfo user={user} />
              </header>
              <div className='app-main-container d-flex flex-column flex-fill tw-py-4'>
                <div className='app-content container' id='home-onboarding-4'>
                  <Outlet
                    context={{
                      classrooms,
                      levels,
                      handleOpenModal,
                      getClassroomsData,
                    }}
                  />
                </div>
              </div>
            </div>
            <CreateClassModal
              open={createClassModalOpen}
              onClose={handleClose}
              levels={levels}
            />
          </div>
        </ModalContextProvider>
      </OnboardingContextProvider>
    </TourProvider>
  );
};

export default App;

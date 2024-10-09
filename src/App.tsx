import React, { useCallback, useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Button, CircularProgress } from '@mui/material';
import Sidebar from './components/Sidebar';
import { type ITeacherSubjectClassroom } from 'global/interfaces';
import { type AxiosResponse } from 'axios';
import { FetchStatus } from 'global/enums';
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
import { getTeacherSubjectClassroomByTeacherId } from 'services/teacher_subject_classroom';
import Header from 'components/Header';

moment.locale('es');

const App: React.FC = () => {
  const [classrooms, setClassrooms] = useState<ITeacherSubjectClassroom[]>([]);
  const [levels, setLevels] = useState<Levels[]>([]);
  const [fetching, setFetching] = useState<FetchStatus>(FetchStatus.Idle);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const getClassroomsData = useCallback(async () => {
    try {
      if (user?.id) {
        const response = await getTeacherSubjectClassroomByTeacherId(user.id);
        const classroomsList = response?.data;
        setClassrooms(classroomsList as ITeacherSubjectClassroom[]);
        setFetching(FetchStatus.Success);
      }
    } catch (error) {
      console.error(error);
      Toaster('error', 'Hubo un error al cargar las clases');
    }
  }, [user]);

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

  const getLevels = useCallback(async () => {
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
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(String(error));
      }
      Toaster('error', 'Hubo un error al cargar los niveles');
    }
  }, []);

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
    const fetchData = async () => {
      if (user && getLevels && getClassroomsData) {
        setFetching(FetchStatus.Pending);
        await Promise.all([getLevels(), getClassroomsData()]);
      }
    };
    void fetchData();
  }, [user, getLevels, getClassroomsData]);

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
            />
            <div className='tw-flex tw-flex-col tw-w-full '>
              <Header />
              <div className='app-main-container d-flex flex-column flex-fill'>
                <div className='app-content container tw-py-8' id='home-onboarding-4'>
                  <Outlet
                    context={{
                      classrooms,
                      levels,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </ModalContextProvider>
      </OnboardingContextProvider>
    </TourProvider>
  );
};

export default App;

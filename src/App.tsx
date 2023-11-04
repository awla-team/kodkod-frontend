import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Button, CircularProgress } from '@mui/material';
import Sidebar from './components/Sidebar';
import { getClassesByUser } from 'services/classes';
import { IClass } from 'global/interfaces';
import { AxiosResponse } from 'axios';
import { FetchStatus } from 'global/enums';
import { CreateClassModal } from './components/Modals';
import { sortClasses } from './utils';
import { getAllTheLevel } from './services/levels';
import Toaster from './utils/Toster';
import { Levels } from './components/Modals/CreateClassModal/interfaces';
import { useAuth } from './contexts/AuthContext';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import 'moment/dist/locale/es';
import './App.css';
import OnboardingContextProvider from 'contexts/OnboardingContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DoneIcon from '@mui/icons-material/Done';
import { TourProvider, useTour } from '@reactour/tour';

moment.locale('es');

const App: React.FC = () => {
  const [classes, setClasses] = useState<IClass[]>([]);
  const [levels, setLevels] = useState<Levels[]>([]);
  const [fetching, setFetching] = useState<FetchStatus>(FetchStatus.Idle);
  const [createClassModalOpen, setCreateClassModalOpen] =
    useState<boolean>(false);
  const { user, checkUserSubscription } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const getClassesData = () => {
    getClassesByUser(user.id)
      .then((response: AxiosResponse) => {
        return response?.data;
      })
      .then((classes: IClass[]) => {
        setClasses(!!classes ? sortClasses(classes) : []);
        setFetching(FetchStatus.Success);
      })
      .catch((error) => {
        setFetching(FetchStatus.Error);
        console.error(error);
      });
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
    data?: IClass
  ) => {
    if (reason !== 'backdropClick') setCreateClassModalOpen(false);
    if (reason === 'success') {
      if (data) {
        setClasses((prevState) => {
          return sortClasses([...prevState, data]);
        });
      }
    }
  };

  const handleOpenModal = () => {
    if (classes.length >= 1) {
      checkUserSubscription('Has alcanzado el límite de cursos gratuitos', () =>
        setCreateClassModalOpen(true)
      );
    } else {
      setCreateClassModalOpen(true);
    }
  };

  const handleFinish = () => {
    let currentView = location.pathname.match(/\/([^/]+)$/)[1];
    if (!isNaN(currentView))
      currentView = location.pathname.match(/\/([^/]+)\/[^/]+$/)[1];
    const rawOnboardingData = localStorage.getItem('onboarding-data');
    const onboardingData = JSON.parse(rawOnboardingData) || {};
    onboardingData[currentView] = true;
    localStorage.setItem('onboarding-data', JSON.stringify(onboardingData));
  };

  useEffect(() => {
    if (location.state) {
      const { deletedClass } = location.state;
      if (deletedClass) {
        setClasses((prevState) => {
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
      getClassesData();
      getLevels();
    }
  }, [user]);

  if (fetching === FetchStatus.Idle || fetching === FetchStatus.Pending)
    return (
      <div className="app-container d-flex">
        <div className="d-flex w-100 h-100 justify-content-center align-items-center">
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
          variant="outlined"
          className="me-2"
          size="small"
          startIcon={<ArrowBackIcon />}
          disabled={currentStep === 0}
          onClick={() => setCurrentStep(currentStep - 1)}
          color="primary"
        >
          Atrás
        </Button>
      )}
      nextButton={({ setIsOpen, setCurrentStep, currentStep, stepsLength }) => {
        if (currentStep === stepsLength - 1) {
          return (
            <Button
              variant="contained"
              className="ms-2"
              size="small"
              startIcon={<DoneIcon />}
              onClick={() => {
                setIsOpen(false);
                handleFinish();
              }}
              color="primary"
            >
              Finalizar
            </Button>
          );
        } else {
          return (
            <Button
              variant="outlined"
              className="ms-2"
              size="small"
              endIcon={<ArrowForwardIcon />}
              onClick={() => setCurrentStep(currentStep + 1)}
              color="primary"
            >
              Siguiente
            </Button>
          );
        }
      }}
    >
      <OnboardingContextProvider>
        <div className="app-container d-flex">
          <Sidebar classes={classes} handleOpenModal={handleOpenModal} />
          <div className="app-main-container d-flex flex-column flex-fill">
            <div className="app-content container" id="home-onboarding-4">
              <Outlet context={{ classes, handleOpenModal, getClassesData }} />
            </div>
          </div>
          <CreateClassModal
            open={createClassModalOpen}
            onClose={handleClose}
            levels={levels}
          />
        </div>
      </OnboardingContextProvider>
    </TourProvider>
  );
};

export default App;

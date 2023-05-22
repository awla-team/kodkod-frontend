import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
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
import SubscribeModal from 'components/Modals/SubscribeModal';

moment.locale('es');

const App: React.FC = () => {
  const [classes, setClasses] = useState<IClass[]>([]);
  const [levels, setLevels] = useState<Levels[]>([]);
  const [fetching, setFetching] = useState<FetchStatus>(FetchStatus.Idle);
  const [createClassModalOpen, setCreateClassModalOpen] = useState<boolean>(false);
  const { user, checkUserSubscription } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const getClassesData = () => {
    getClassesByUser(user.id)
      .then((response: AxiosResponse) => {
        return response?.data?.responseData;
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
      const { data }: { data: { responseData: Levels[] } } = await getAllTheLevel();
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

  const handleClose = (reason: 'backdropClick' | 'escapeKeyDown' | 'success', data?: IClass) => {
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
    if (classes.length >= 2) {
      checkUserSubscription('Has alcanzado el límite de cursos gratuitos', () =>
        setCreateClassModalOpen(true)
      );
    } else {
      setCreateClassModalOpen(true);
    }
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
    <div className="app-container d-flex">
      <Sidebar classes={classes} handleOpenModal={handleOpenModal} />
      <div className="app-main-container d-flex flex-column flex-fill">
        <div className="app-content container">
          <Outlet context={{ classes, handleOpenModal, getClassesData }} />
        </div>
      </div>
      <CreateClassModal open={createClassModalOpen} onClose={handleClose} levels={levels} />
    </div>
  );
};

export default App;

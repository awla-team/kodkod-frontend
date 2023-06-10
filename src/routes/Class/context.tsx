import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { IClass } from 'global/interfaces';
import { getClassByID } from 'services/classes';
import Toaster from 'utils/Toster';
import { studentsByClass } from 'services/students';
import { useParams } from 'react-router-dom';
import { StudentType } from 'components/StudentsList/interfaces';
import { ClassContextType } from './interfaces';
import { Levels } from 'components/Modals/CreateClassModal/interfaces';
import { getAllTheLevel } from './../../services/levels';
import { IStage } from 'global/interfaces';
import { FetchStatus } from 'global/enums';

const ClassContext = createContext<ClassContextType>({
  students: [],
  classDetails: undefined,
  getStudentsByClass: (id: number | string) => {},
  getClassById: (id: number | string) => {},
  updateStudentsData: (actionType, data) => {},
  levels: [],
  updateStageData: (stage: IStage) => {},
  setClassDetails: (prevState) => {},
  loadingClass: FetchStatus.Idle,
});

export const useClassContext = () => {
  return useContext(ClassContext);
};

const ClassContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [classDetails, setClassDetails] = useState<IClass | undefined>();
  const [levels, setLevels] = useState<Levels[]>([]);
  const [students, setStudents] = useState<StudentType[]>([]);
  const [loadingClass, setLoadingClass] = useState(FetchStatus.Idle);

  const { classId } = useParams();

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

  useEffect(() => {
    if (classId) {
      getClassById(classId);
      getStudentsByClass(classId);
      getLevels();
    }
  }, [classId]);

  const getClassById = async (id: number | string) => {
    setLoadingClass(FetchStatus.Pending);
    try {
      const { data }: { data: { responseData: IClass } } = await getClassByID(id);
      setClassDetails(data.responseData);
      setLoadingClass(FetchStatus.Success);
    } catch (error: any) {
      console.error(error);
      Toaster('error', 'Hubo un error al cargar el curso');
      setLoadingClass(FetchStatus.Error);
    }
  };

  const getStudentsByClass = async (id: number | string) => {
    try {
      const { data }: { data: any } = await studentsByClass(id, {
        role: 'student',
      });
      setStudents(data.responseData);
    } catch (error: any) {
      console.error(error);
      Toaster('error', 'Hubo un error al cargar los estudiantes');
    }
  };

  const updateStageData = (stage: IStage) => {
    const stagesCopy = [...classDetails.current_adventure.stages];
    const match = stagesCopy.find((currentStage) => currentStage.id === stage.id);
    const index = stagesCopy.indexOf(match);
    stagesCopy[index] = stage;
    stagesCopy.sort((a, b) => {
      if (a._index > b._index) return 1;
      if (a._index < b._index) return -1;
      return 0;
    });

    setClassDetails({
      ...classDetails,
      current_adventure: {
        ...classDetails.current_adventure,
        stages: stagesCopy,
      },
    });
  };

  const updateStudentsData = (
    actionType: 'delete' | 'update',
    data: StudentType | StudentType[]
  ) => {
    if (data) {
      switch (actionType) {
        case 'update':
          {
            if (Array.isArray(data)) {
              setStudents((prevState) => {
                return [...data, ...prevState];
              });
            } else {
              setStudents((prevState) => {
                const tempData = [...prevState];
                const findIndex = tempData.findIndex((student) => student.id === data.id);
                if (findIndex > -1) {
                  tempData[findIndex] = data;
                }
                return tempData;
              });
            }
          }
          break;
        case 'delete': {
          if (!Array.isArray(data)) {
            setStudents((prevState) => {
              const tempData = [...prevState];
              const findIndex = tempData.findIndex((student) => student.id === data.id);
              if (findIndex > -1) {
                tempData.splice(findIndex, 1);
              }
              return tempData;
            });
          }
          break;
        }
        default: {
          break;
        }
      }
    }
  };

  return (
    <ClassContext.Provider
      value={{
        updateStudentsData,
        updateStageData,
        getClassById,
        getStudentsByClass,
        classDetails,
        loadingClass,
        students,
        levels,
        setClassDetails,
      }}
    >
      {children}
    </ClassContext.Provider>
  );
};

export default ClassContextProvider;

import {
  createContext,
  type FC,
  type PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  type ITeacherSubjectClassroomData,
  type IClass,
  type IStage,
  type ITeacherSubjectClassroom,
} from 'global/interfaces';
import { getClassByID } from 'services/classes';
import Toaster from 'utils/Toster';
import { studentsByClass } from 'services/students';
import { useParams } from 'react-router-dom';
import { type StudentType } from 'components/StudentsList/interfaces';
import { type ClassContextType } from './interfaces';
import { type Levels } from 'components/Modals/CreateClassModal/interfaces';
import { getAllTheLevel } from './../../services/levels';
import { FetchStatus } from 'global/enums';
import { type AxiosResponse } from 'axios';
import { getTeacherSubjectClassroomById } from 'services/teacher_subject_classroom';
import { useClassroom } from 'zustand/classroom-store';
import { useSubjectStore } from 'zustand/subject-store';

const ClassContext = createContext<ClassContextType>({
  students: [],
  classDetails: undefined,
  classroomDetails: undefined,
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
  const [classroomDetails, setClassroomDetails] = useState<
    ITeacherSubjectClassroom | undefined
  >();
  const [levels, setLevels] = useState<Levels[]>([]);
  const [students, setStudents] = useState<StudentType[]>([]);
  const [loadingClass, setLoadingClass] = useState(FetchStatus.Idle);
  const { setClassroom } = useClassroom();
  const { setSubject } = useSubjectStore();

  const { classId } = useParams();

  const getClassroomDetailsData = useCallback(() => {
    setLoadingClass(FetchStatus.Pending);
    try {
      if (classId) {
        getTeacherSubjectClassroomById(classId as string)
          .then((response: AxiosResponse) => {
            return response?.data;
          })
          .then((techerClassroom: ITeacherSubjectClassroom) => {
            setClassroom(techerClassroom.classroom);
            setSubject(techerClassroom.subject);
            setClassroomDetails(techerClassroom);
            setLoadingClass(FetchStatus.Success);
          })
          .catch((error) => {
            setLoadingClass(FetchStatus.Error);
            console.error(error);
            Toaster('error', 'Hubo un error al cargar el curso');
          });
      }
    } catch (error) {
      console.error(error);
    }
  }, [classId, setClassroom, setSubject]);

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
    } catch (error: any) {
      console.error(error);
      Toaster('error', 'Hubo un error al cargar los niveles');
    }
  }, []);

  useEffect(() => {
    if (classId) {
      getClassroomDetailsData();
      void getLevels();
    }
  }, [classId, getClassroomDetailsData, getLevels]);

  const getClassById = async (id: number | string) => {
    setLoadingClass(FetchStatus.Pending);
    try {
      const { data }: { data: IClass } = await getClassByID(id);
      setClassDetails(data);
      setLoadingClass(FetchStatus.Success);
    } catch (error: any) {
      console.error(error);
      Toaster('error', 'Hubo un error al cargar el curso');
      setLoadingClass(FetchStatus.Error);
    }
  };

  const getStudentsByClass = async (id: number | string) => {
    try {
      const { data } = await studentsByClass<StudentType>(id, {
        role: 'student',
      });
      const orderByLastname = data.responseData.sort((a, b) =>
        a.last_name.localeCompare(b.last_name)
      );
      setStudents(orderByLastname);
    } catch (error: any) {
      console.error(error);
      Toaster('error', 'Hubo un error al cargar los estudiantes');
    }
  };

  const updateStageData = (stage: IStage) => {
    // FIXME: fix this ts error
    // @ts-expect-error ts-error(18048)
    const stagesCopy = [...classDetails.current_adventure.stages];
    const match = stagesCopy.find(
      (currentStage) => currentStage.id === stage.id
    );
    // FIXME: fix this ts error
    // @ts-expect-error ts-error(2345)
    const index = stagesCopy.indexOf(match);
    stagesCopy[index] = stage;
    stagesCopy.sort((a, b) => {
      if (a._index > b._index) return 1;
      if (a._index < b._index) return -1;
      return 0;
    });

    setClassDetails({
      ...classDetails,
      // FIXME: fix this ts error
      // @ts-expect-error ts-error(2322)
      current_adventure: {
        // FIXME: fix this ts error
        // @ts-expect-error ts-error(18048)
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
          // FIXME: fix this eslint error
          // eslint-disable-next-line no-lone-blocks
          {
            if (Array.isArray(data)) {
              setStudents((prevState) => {
                return [...data, ...prevState];
              });
            } else {
              setStudents((prevState) => {
                const tempData = [...prevState];
                const findIndex = tempData.findIndex(
                  (student) => student.id === data.id
                );
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
              const findIndex = tempData.findIndex(
                (student) => student.id === data.id
              );
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
        // FIXME: fix this ts error
        // @ts-expect-error ts-error(2322)
        updateStudentsData,
        updateStageData,
        getClassById,
        getStudentsByClass,
        classDetails,
        classroomDetails,
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

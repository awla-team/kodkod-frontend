import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { ClassInterface } from "services/classes/interfaces";
import { getClassByID } from "services/classes";
import Toaster from "utils/Toster";
import { studentsByClass } from "services/students";
import { useParams } from "react-router-dom";
import { StudentType } from "components/StudentsList/interfaces";
import { ClassContextType } from "./interfaces";
import { IAdventure } from "global/interfaces";
import { Levels } from "components/Modals/CreateClassModal/interfaces";
import { getAllTheLevel } from "./../../services/levels";

const ClassContext = createContext<ClassContextType>({
  students: [],
  classDetails: undefined,
  getStudentsByClass: (id: number | string) => {},
  getClassById: (id: number | string) => {},
  updateStudentsData: (actionType, data) => {},
  levels: [],
  setClassDetails: (prevState) => {},
});

export const useClassContext = () => {
  return useContext(ClassContext);
};

const ClassContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [classDetails, setClassDetails] = useState<
    ClassInterface | undefined
  >();
  const [levels, setLevels] = useState<Levels[]>([]);
  const [students, setStudents] = useState<StudentType[]>([]);
  const [currentAdventure, setCurrentAdventure] = useState<null | IAdventure>(
    null
  );

  const { classId } = useParams();

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
    } catch (e: any) {
      Toaster("error", e.message);
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
    try {
      const { data }: { data: { responseData: ClassInterface } } =
        await getClassByID(id);
      setClassDetails(data.responseData);
    } catch (e: any) {
      Toaster("error", e.message);
    }
  };

  const getStudentsByClass = async (id: number | string) => {
    try {
      const { data }: { data: any } = await studentsByClass(id, {
        role: "student",
      });
      setStudents(data.responseData);
    } catch (e: any) {
      Toaster("error", e.message);
    }
  };

  const updateStudentsData = (
    actionType: "delete" | "update",
    data: StudentType | StudentType[]
  ) => {
    if (data) {
      switch (actionType) {
        case "update":
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
        case "delete": {
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
        updateStudentsData,
        getClassById,
        getStudentsByClass,
        classDetails,
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

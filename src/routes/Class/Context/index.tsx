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
import { ClassContextType } from "../interfaces";

const ClassContext = createContext<ClassContextType>({
  students: [],
  classDetails: undefined,
  getStudentsByClass: (id: number | string) => {},
  getClassById: (id: number | string) => {},
  updateStudentsData: (actionType, data) => {},
});

export const useClassContext = () => {
  return useContext(ClassContext);
};

const ClassContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [classDetails, setClassDetails] = useState<
    ClassInterface | undefined
  >();
  const [students, setStudents] = useState<StudentType[]>([]);

  const { classId } = useParams();

  useEffect(() => {
    if (classId) {
      getClassById(classId);
      getStudentsByClass(classId);
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
      const { data }: { data: any } = await studentsByClass(id, "student");
      setStudents(data.responseData);
    } catch (e: any) {
      Toaster("error", e.message);
    }
  };

  const updateStudentsData = (
    actionType: "delete" | "update",
    data: StudentType
  ) => {
    if (data) {
      if (actionType === "delete") {
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
  };

  return (
    <ClassContext.Provider
      value={{
        updateStudentsData,
        getClassById,
        getStudentsByClass,
        classDetails,
        students,
      }}
    >
      {children}
    </ClassContext.Provider>
  );
};

export default ClassContextProvider;

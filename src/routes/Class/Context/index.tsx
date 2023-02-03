import {createContext, FC, PropsWithChildren, useContext, useEffect, useState} from 'react'
import {ClassInterface} from "../../../services/classes/interfaces";
import {getClassByID} from "../../../services/classes";
import Toaster from "../../../utils/Toster";
import {studentsByClass} from "../../../services/students";
import {useParams} from "react-router-dom";
import {StudentType} from "../../../components/StudentsList/interfaces";
import {ClassContextType} from "../interfaces";


const ClassContext = createContext<ClassContextType>({
    students: [],
    classDetails: undefined,
    getStudentsByClass: (id: number | string) => {},
    getClassById: (id: number | string) => {},
})

export const useClassContext = () => {
    return useContext(ClassContext)
}

const ClassContextProvider: FC<PropsWithChildren> = ({children}) => {
    const [classDetails, setClassDetails] = useState<ClassInterface | undefined>()
    const [students, setStudents] = useState<StudentType[]>([])

    const {classId} = useParams();


    useEffect(() => {
        if (classId) {
            getClassById(classId)
            getStudentsByClass(classId)
        }
    }, [classId])

    const getClassById = async (id: number | string) => {
        try {
            const {data}: { data: ClassInterface } = await getClassByID(id)
            setClassDetails(data)
        } catch (e: any) {
            Toaster('error', e.message)
        }
    }

    const getStudentsByClass = async (id: number | string) => {
        try {
            const {data}: { data: any } = await studentsByClass(id)
            setStudents(data)

        } catch (e: any) {
            Toaster('error', e.message)
        }
    }

    return <ClassContext.Provider value={{getClassById, getStudentsByClass, classDetails, students}}>
        {children}
    </ClassContext.Provider>
}


export default ClassContextProvider
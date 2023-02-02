import http from "global/api";

export const studentsByClass= (classId: number | string) =>{
    return http.get('students?classId='+classId)
}
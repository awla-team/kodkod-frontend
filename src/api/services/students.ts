import http from 'api/api';
import {
  StudentType,
  type StudentUpdateDataType,
} from '../../components/StudentsList/interfaces';
import { type AddStudentsInClassBody } from './interfaces';
import { generateQueryParamsFromObject } from '../../utils';

export interface UserFilter {
  role?: 'student' | 'teacher';
  missions?: boolean;
  rewards?: true;
}

export const studentsByClass = async (
  classId: number | string,
  queryObject?: UserFilter
) => {
  return await http.get(
    `user-by-class/${classId}` + generateQueryParamsFromObject(queryObject)
  );
};

export const updateStudent = async (
  id: number | string,
  body?: Partial<StudentUpdateDataType>
) => {
  return await http.put('user/' + id, body);
};

export const addStudentsInClass = async (body: AddStudentsInClassBody) => {
  return await http.post('add-students', body);
};

export const deleteStudent = async (id: number | string) => {
  return await http.delete('user/' + id);
};

import http from 'global/api';
import {
  type StudentType,
  type StudentUpdateDataType,
} from '../components/StudentsList/interfaces';
import { type AddStudentsInClassBody } from './interfaces';
import { generateQueryParamsFromObject } from '../utils';
import { type KodkodResponse } from 'api/types/custom-response';

export interface UserFilter {
  role?: 'student' | 'teacher';
  missions?: boolean;
  rewards?: true;
}

export const studentsByClass = async <T = StudentType>(
  classId: number | string,
  queryObject?: UserFilter
) => {
  return await http.get<KodkodResponse<T[]>>(
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

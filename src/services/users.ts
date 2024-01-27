import http from 'api/api';
import { type IUser } from 'global/interfaces';
import { generateQueryParamsFromObject } from '../utils';

interface UserFilter {
  role?: 'student' | 'teacher';
}

export const getAuthUser = async () => {
  return await http.get('/get-auth-user');
};

export const getUsers = async (filter: UserFilter) => {
  return await http.get('/user' + generateQueryParamsFromObject(filter));
};

export const getUsersByEmail = async (params: {
  role: string;
  email_list: string[];
}) => {
  return await http.get<IUser>('/users-by-email', { params });
};

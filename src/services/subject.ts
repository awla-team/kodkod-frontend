import http from 'global/api';
import Subject from 'types/models/Subject';

export const getSubjectById = async (id: number) =>
  await http.get<Subject>(`/subjects/${id}`);

import http from 'global/api';

interface ClassMutationType {
  id?: number;
  id_level: number;
  code: string;
  alias: string;
  id_user?: number;
}
export const getClassesByUser = async (userId: number | string) =>
  await http.get(`classes-by-user/` + userId);

export const createClass = async (body: ClassMutationType) =>
  await http.post(`class`, body);

export const getClassByID = async (id: number | string) => {
  return await http.get('class/' + id);
};

export const updateClass = async (body: ClassMutationType) => {
  return await http.put('class/' + body.id, body);
};

export const deleteClass = async (id: number | string) => {
  return await http.delete('class/' + id);
};

export const getClassHasAdventuresByClass = async (
  classId: number | string
) => {
  return await http.get(`completed-class-adventures/${classId}`);
};

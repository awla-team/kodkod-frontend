import http from 'api/api';

export const getAllTheLevel = async () => {
  return await http.get('/level');
};

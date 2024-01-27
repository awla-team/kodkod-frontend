import http from 'global/api';

export const getAllTheLevel = async () => {
  return await http.get('/level');
};

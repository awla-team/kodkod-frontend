import http from 'api/config';

export const getAllTheLevel = async () => {
  return await http.get('/level');
};

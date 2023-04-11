import http from 'global/api';

export const getAllTheLevel = () => {
  return http.get('/level');
};

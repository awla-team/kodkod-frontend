import http from '../api';

export const getSchools = async () => {
  return await http.get('school');
};

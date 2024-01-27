import http from '../api/api';

export const getSchools = async () => {
  return await http.get('school');
};

import http from '../config';

export const getSchools = async () => {
  return await http.get('school');
};

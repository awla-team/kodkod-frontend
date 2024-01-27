import http from '../global/api';

export const getSchools = async () => {
  return await http.get('school');
};

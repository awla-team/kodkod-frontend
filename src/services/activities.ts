import { type IActivitySaved } from './../types/models/Activity';
import http from 'global/api';

export const saveActivity = async (activity: IActivitySaved) => {
  return await http.post('activity', activity);
};

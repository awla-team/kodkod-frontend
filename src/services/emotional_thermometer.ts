import http from 'global/api';
import Moment from 'moment';
import { Moment as MomentType } from 'moment/moment';

interface SaveBody {
  score: number;

  challenge: string;

  most_remarkable: string;

  id_class: number | string;

  date: string;
}

interface UpdateBody extends Partial<SaveBody> {}

export const getEmotionalThermometerByClassId = (
  classId: number | string,
  dateFrom?: MomentType,
  dateTo?: MomentType
) => {
  let queryParams: string = '';
  if (dateFrom || dateTo) {
    if (dateFrom && dateTo && dateFrom.isValid() && dateTo.isValid()) {
      queryParams = `?date_from=${dateFrom.utc().format()}&date_to=${dateTo
        .utc()
        .format()}`;
    } else {
      if (dateFrom.isValid()) {
        queryParams = `?date_from=${dateFrom.utc().format()}`;
      }
      if (Moment(dateTo).isValid()) {
        queryParams = `?date_to=${dateTo.utc().format()}`;
      }
    }
  }
  return http.get(`/emotional-thermometer-by-classId/${classId}` + queryParams);
};

export const saveEmotionalThermometerDetails = (body: SaveBody) => {
  return http.post('emotional-thermometer', body);
};

export const updateEmotionalThermometerDetails = (
  id: number | string,
  body: UpdateBody
) => {
  return http.put('emotional-thermometer/' + id, body);
};

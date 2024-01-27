import http from 'api/config';
import Moment from 'moment';
import { type Moment as MomentType } from 'moment/moment';

interface SaveBody {
  score: number;

  challenge: string;

  most_remarkable: string;

  id_class: number | string;

  date: string;
}

interface UpdateBody extends Partial<SaveBody> {}

export const getEmotionalThermometerByClassId = async (
  classId: number | string,
  dateFrom?: MomentType,
  dateTo?: MomentType
) => {
  let queryParams = '';
  if (dateFrom || dateTo) {
    if (dateFrom && dateTo && dateFrom.isValid() && dateTo.isValid()) {
      queryParams = `?date_from=${dateFrom.utc().format()}&date_to=${dateTo
        .utc()
        .format()}`;
    } else {
      // FIXME: fix this ts error
      // @ts-expect-error ts-error(18048)
      if (dateFrom.isValid()) {
        // FIXME: fix this ts error
        // @ts-expect-error ts-error(18048)
        queryParams = `?date_from=${dateFrom.utc().format()}`;
      }
      if (Moment(dateTo).isValid()) {
        // FIXME: fix this ts error
        // @ts-expect-error ts-error(18048)
        queryParams = `?date_to=${dateTo.utc().format()}`;
      }
    }
  }
  return await http.get(
    `/emotional-thermometer-by-classId/${classId}` + queryParams
  );
};

export const saveEmotionalThermometerDetails = async (body: SaveBody) => {
  return await http.post('emotional-thermometer', body);
};

export const updateEmotionalThermometerDetails = async (
  id: number | string,
  body: UpdateBody
) => {
  return await http.put('emotional-thermometer/' + id, body);
};

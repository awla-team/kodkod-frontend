import moment from 'moment';
import * as Yup from 'yup';

export const CATEGORY_MAPPING: Readonly<Record<number, string>> = {
  0: 'Muy malo',
  1: 'Malo',
  2: 'Neutral',
  3: 'Bueno',
  4: 'Muy bueno',
};

export const validationSchema = () => {
  return Yup.object().shape({
    score: Yup.number().required(),
    challenge: Yup.string().required(),
    most_remarkable: Yup.string().required(),
  });
};

export const termometerRecordAdapter = (termometerRecords: any[]) => {
  const data = termometerRecords.map((termometerRecord: any) => {
    const { score, date, ...otherProps } = termometerRecord;
    return {
      date: moment.utc(date).local().valueOf(),
      category: CATEGORY_MAPPING[score],
      ...otherProps,
    };
  });
  return data;
};

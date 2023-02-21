import http from "global/api";
import Moment from "moment";

export const getEmotionalThermometerByClassId = (
  classId: number | string,
  dateFrom?: Date,
  dateTo?: Date
) => {
  let queryParams: string = "";
  if (dateFrom || dateTo) {
    if (
      dateFrom &&
      dateTo &&
      Moment(dateFrom).isValid() &&
      Moment(dateTo).isValid()
    ) {
      queryParams = `?date_from=${Moment(dateFrom).format(
        "YYYY-MM-DD"
      )}&date_to=${Moment(dateTo).format("YYYY-MM-DD")}`;
    } else {
      if (Moment(dateFrom).isValid()) {
        queryParams = `?date_from=${Moment(dateFrom).format("YYYY-MM-DD")}`;
      }
      if (Moment(dateTo).isValid()) {
        queryParams = `?date_to=${Moment(dateTo).format("YYYY-MM-DD")}`;
      }
    }
  }
  return http.get(`/emotional-thermometer-by-classId/${classId}` + queryParams);
};

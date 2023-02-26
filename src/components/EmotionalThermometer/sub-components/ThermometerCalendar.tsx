import { FC, useMemo, useState } from "react";
import { ThermometerCalendarView } from "./styled";
import Moment from "moment";
import type { Moment as MomentType } from "moment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { CalendarPicker } from "@mui/x-date-pickers/CalendarPicker";
import { ThermometerCalendarProps } from "./interfaces";

const ThermometerCalendar: FC<ThermometerCalendarProps> = ({
  date,
  handleDateChange,
}) => {
  return (
    <ThermometerCalendarView>
      <div className={"info__text"}>
        Select a date to use your Emotional Thermometer or to edit another
      </div>
      <div className={"calendar__container"}>
        {/*<div className={"date__text"}>{Moment().format("MMMM yyyy")}</div>*/}

        <div className={"calendar__view"}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <CalendarPicker
              minDate={Moment().subtract(30, "day")}
              maxDate={Moment()}
              date={date}
              onChange={(newDate) => handleDateChange(Moment(newDate))}
            />
          </LocalizationProvider>
        </div>
      </div>
    </ThermometerCalendarView>
  );
};

export default ThermometerCalendar;

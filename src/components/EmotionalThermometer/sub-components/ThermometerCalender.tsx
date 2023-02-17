import { FC, useMemo, useState } from "react";
import { ThermometerCalenderView } from "./styled";
import Moment from "moment";
import type { Moment as MomentType } from "moment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { CalendarPicker } from "@mui/x-date-pickers/CalendarPicker";
import { ThermometerCalenderProps } from "./interfaces";

const ThermometerCalender: FC<ThermometerCalenderProps> = ({
  date,
  handleDateChange,
}) => {
  return (
    <ThermometerCalenderView>
      <div className={"info__text"}>
        Select a date to use your Emotional Thermometer or to edit another
      </div>
      <div className={"calender__container"}>
        {/*<div className={"date__text"}>{Moment().format("MMMM yyyy")}</div>*/}

        <div className={"calender__view"}>
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
    </ThermometerCalenderView>
  );
};

export default ThermometerCalender;

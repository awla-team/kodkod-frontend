import { FC, useState } from "react";
import { ThermometerCalendarView } from "./styled";
import Moment from "moment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { CalendarPicker } from "@mui/x-date-pickers/CalendarPicker";
import { ThermometerCalendarProps } from "./interfaces";
import { DatePicker, DesktopDatePicker } from "@mui/x-date-pickers";
import { Button, TextField } from "@mui/material";
import { CalendarMonth } from "@mui/icons-material";

const ThermometerCalendar: FC<ThermometerCalendarProps> = ({
  date,
  handleDateChange,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <ThermometerCalendarView>      
      <div className={"calendar__container"}>
        {/*<div className={"date__text"}>{Moment().format("MMMM yyyy")}</div>*/}

        <div className={"calendar__view"}>
          <LocalizationProvider dateAdapter={AdapterMoment}>    
            {/*<CalendarPicker
              minDate={Moment().subtract(30, "day")}
              maxDate={Moment()}
              date={date}
              onChange={(newDate) => handleDateChange(Moment(newDate))}
            />*/}
            <DatePicker
              open={isOpen}
              onClose={() => setIsOpen(false)}
              minDate={Moment().subtract(30, "day")}
              maxDate={Moment()}
              value={date}
              onChange={handleDateChange}
              renderInput={({ inputRef }) => (
                <div ref={inputRef}>                  
                  <Button variant="outlined" startIcon={<CalendarMonth />} onClick={() => setIsOpen(!isOpen)}>
                    Editar otra fecha
                  </Button>
                </div>                
              )}
            />
          </LocalizationProvider>
        </div>
      </div>
    </ThermometerCalendarView>
  );
};

export default ThermometerCalendar;

import { FC, useCallback, useEffect, useMemo, useState } from "react";
import * as Styled from "./styled";
import Moment from "moment";
import type { Moment as MomentType } from "moment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { ThermometerCalenderProps } from "./interfaces";
import { EmotionalThermometerType } from "../interfaces";
import { getEmotionalThermometerByClassId } from "../../../services/emotional_thermometer";
import Toaster from "utils/Toster";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers";

const ThermometerCalender: FC<ThermometerCalenderProps> = ({
  date,
  handleDateChange,
  classId,
}) => {
  const [detailsByDates, setDetailsByDates] = useState<
    EmotionalThermometerType[]
  >([]);

  useEffect(() => {
    handleMonthChange(date);
  }, [date, classId]);

  const handleMonthChange = async (date: Moment.Moment) => {
    try {
      const {
        data: { responseData },
      }: { data: { responseData: EmotionalThermometerType[] } } =
        await getEmotionalThermometerByClassId(
          classId,
          Moment(date).startOf("month").toDate(),
          Moment(date).endOf("month").toDate()
        );
      setDetailsByDates(responseData);
    } catch (e: any) {
      Toaster("error", e.message);
    }
  };

  const checkDate = (date: MomentType): Boolean => {
    return detailsByDates.some((res) =>
      Moment(res.date).startOf("day").isSame(date, "day")
    );
  };
  return (
    <Styled.ThermometerCalenderView>
      <div className={"info__text"}>
        Select a date to use your Emotional Thermometer or to edit another
      </div>
      <div className={"calender__container"}>
        {/*<div className={"date__text"}>{Moment().format("MMMM yyyy")}</div>*/}

        <div className={"calender__view"}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <Styled.CalendarPicker
              renderDay={(
                day: MomentType | unknown,
                selectedDays: MomentType[] | unknown[],
                pickersDayProps:
                  | PickersDayProps<MomentType>
                  | PickersDayProps<unknown>
              ) => {
                return (
                  <Styled.PickersDateContainer key={pickersDayProps.key}>
                    <PickersDay
                      day={day}
                      outsideCurrentMonth={false}
                      {...(pickersDayProps as PickersDayProps<MomentType>)}
                    />
                    {!pickersDayProps.outsideCurrentMonth &&
                      checkDate(day as MomentType) && (
                        <span className={"tick__icon"}>&#10004;</span>
                      )}
                  </Styled.PickersDateContainer>
                );
              }}
              onMonthChange={(date: any) => handleMonthChange(date)}
              minDate={Moment().subtract(30, "day")}
              maxDate={Moment()}
              date={date}
              onChange={(newDate: any) => handleDateChange(Moment(newDate))}
            />
          </LocalizationProvider>
        </div>
      </div>
    </Styled.ThermometerCalenderView>
  );
};
export default ThermometerCalender;

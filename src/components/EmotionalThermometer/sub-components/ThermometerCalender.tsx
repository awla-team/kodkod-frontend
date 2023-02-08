import {FC, useMemo, useState} from "react";
import {ThermometerCalenderView} from "./styled";
import Moment from "moment";
import type {Moment as MomentType} from 'moment'
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment'
import {CalendarPicker} from '@mui/x-date-pickers/CalendarPicker';

const ThermometerCalender: FC = () => {
    const [date, setDate] = useState<MomentType>(Moment())
    return (
        <ThermometerCalenderView>
            <div className={"info__text"}>
                Select a date to use your Emotional Thermometer or to edit another
            </div>
            <div className={"calender__container"}>
                {/*<div className={"date__text"}>{Moment().format("MMMM yyyy")}</div>*/}

                <div className={"calender__view"}>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <CalendarPicker date={date} onChange={(newDate) => setDate(Moment(newDate))}/>
                    </LocalizationProvider>
                    {/*{dates.map((res) => {*/}
                    {/*  return (*/}
                    {/*    <div*/}
                    {/*      key={res}*/}
                    {/*      className={*/}
                    {/*        "date__cell " +( new Date().getDate() === res ? "current" : "")*/}
                    {/*      }*/}
                    {/*    >*/}
                    {/*      {res}*/}
                    {/*      {false && (*/}
                    {/*        <img*/}
                    {/*          src={"/Vectortick.svg"}*/}
                    {/*          alt={"Vectortick"}*/}
                    {/*          className={"last__check"}*/}
                    {/*        />*/}
                    {/*      )}*/}
                    {/*    </div>*/}
                    {/*  );*/}
                    {/*})}*/}
                </div>
            </div>
        </ThermometerCalenderView>
    );
};

export default ThermometerCalender;

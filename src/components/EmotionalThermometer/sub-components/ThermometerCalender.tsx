import { FC, useMemo } from "react";
import { ThermometerCalenderView } from "./styled";
import Moment from "moment";

const ThermometerCalender: FC = () => {
  const dates = useMemo((): number[] => {
    const lastDateOfTheMonth = Moment().endOf("month").toDate().getDate();
    const dates = [];
    for (let i = 1; i <= lastDateOfTheMonth; i++) {
      dates.push(i);
    }
    return dates;
  }, []);
  return (
    <ThermometerCalenderView>
      <div className={"info__text"}>
        Select a date to use your Emotional Thermometer or to edit another
      </div>
      <div className={"calender__container"}>
        <div className={"date__text"}>{Moment().format("MMMM yyyy")}</div>

        <div className={"calender__view"}>
          {dates.map((res) => {
            return (
              <div
                key={res}
                className={
                  "date__cell " +( new Date().getDate() === res ? "current" : "")
                }
              >
                {res}
                {false && (
                  <img
                    src={"/Vectortick.svg"}
                    alt={"Vectortick"}
                    className={"last__check"}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </ThermometerCalenderView>
  );
};

export default ThermometerCalender;

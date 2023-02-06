import { FC } from "react";
import * as Styled from "./styled";
import Moment from "moment";
import { Tooltip } from "@mui/material";
import { ClassClimateMeter } from "./sub-components";

const EmotionalThermometer: FC = () => {
  return (
    <Styled.EmotionalThermometerContainer>
      <div className={"container__header"}>
        <div className={"container__header__text"}>
          <div className={"header__container"}>
            <div className={"header__text"}>Emotional Thermometer</div>
            <div>
              <Tooltip title={"some info"} arrow>
                <img src={"/vectorinfo.svg"} alt={"vectorinfo"} />
              </Tooltip>
            </div>
          </div>
          <div className={"header__date"}>
            {Moment().format("MMMM DD, yyyy")}
          </div>
        </div>
        <button className={"calender__icon"} />
      </div>
      <div className={"helper__text"}>
        Complete this section at the end of each class!
      </div>
      <div className={"thermometer__content"}>
        <ClassClimateMeter />
      </div>
    </Styled.EmotionalThermometerContainer>
  );
};
export default EmotionalThermometer;

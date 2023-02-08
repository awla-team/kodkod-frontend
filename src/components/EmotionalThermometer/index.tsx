import { FC, useState } from "react";
import * as Styled from "./styled";
import Moment from "moment";
import { Tooltip } from "@mui/material";
import { ClassClimateMeter, TodayReviews } from "./sub-components";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { FormInitialValue } from "./interfaces";
import ThermometerCalender from "./sub-components/ThermometerCalender";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const EmotionalThermometer: FC = () => {
  const [calenderView, setCalenderView] = useState<boolean>(false);
  const [formInitialValue, setFormInitialValue] = useState<FormInitialValue>({
    climate: "",
    challenge: "",
    remarkable: "",
  });

  const [editable, setEditable] = useState<boolean>(true);

  const validationSchema = () => {
    return Yup.object().shape({
      climate: Yup.string().required(),
      challenge: Yup.string().required(),
      remarkable: Yup.string().required(),
    });
  };
  const handleSubmit = (
    value: FormInitialValue,
    formikHelpers: FormikHelpers<FormInitialValue>
  ) => {};
  return (
    <Styled.EmotionalThermometerContainer calenderView={calenderView}>
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
        <button
          className={"calender__icon"}
          onClick={() => setCalenderView((prevState) => !prevState)}
        >
          {calenderView ? <ArrowBackIosIcon className={'back__arrow'}/> : ""}
        </button>
      </div>
      {!calenderView ? (
        <>
          <div className={"helper__text"}>
            Complete this section at the end of each class!
          </div>
          <div
            className={
              "thermometer__content " + (editable ? "grey__color" : "")
            }
          >
            <Formik
              initialValues={formInitialValue}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              {({ handleSubmit }) => {
                return (
                  <Form onSubmit={handleSubmit}>
                    <ClassClimateMeter editable={editable} />
                    <TodayReviews
                      editable={editable}
                      setEditable={setEditable}
                    />
                  </Form>
                );
              }}
            </Formik>
          </div>
        </>
      ) : (
        <ThermometerCalender />
      )}
    </Styled.EmotionalThermometerContainer>
  );
};
export default EmotionalThermometer;

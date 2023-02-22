import { FC, useEffect, useState } from "react";
import * as Styled from "./styled";
import Moment from "moment";
import { Tooltip } from "@mui/material";
import { ClassClimateMeter, TodayReviews } from "./sub-components";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import {
  EmotionalThermometerProps,
  EmotionalThermometerType,
  FormInitialValue,
} from "./interfaces";
import ThermometerCalender from "./sub-components/ThermometerCalender";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Moment as MomentType } from "moment/moment";
import Toaster from "../../utils/Toster";
import {
  getEmotionalThermometerByClassId,
  saveEmotionalThermometerDetails,
  updateEmotionalThermometerDetails,
} from "../../services/emotional_thermometer";

const EmotionalThermometer: FC<EmotionalThermometerProps> = ({
  classDetails,
}) => {
  const [date, setDate] = useState<MomentType>(Moment());
  const [calenderView, setCalenderView] = useState<boolean>(false);
  const [formInitialValue, setFormInitialValue] = useState<FormInitialValue>({
    score: null,
    challenge: "",
    most_remarkable: "",
  });

  const [editable, setEditable] = useState<boolean>(false);

  const validationSchema = () => {
    return Yup.object().shape({
      score: Yup.number().required(),
      challenge: Yup.string().required(),
      most_remarkable: Yup.string().required(),
    });
  };

  useEffect(() => {
    if (classDetails) {
      handleGetThermometerDetails(classDetails.id);
    }
  }, [date, classDetails]);

  const handleGetThermometerDetails = async (classId: string | number) => {
    try {
      const {
        data: { responseData },
      }: { data: { responseData: EmotionalThermometerType[] } } =
        await getEmotionalThermometerByClassId(
          classId,
          date.toDate(),
          date.toDate()
        );

      setEditable(!!responseData.length);

      if (responseData.length) {
        const { id, score, most_remarkable, challenge } = responseData[0];
        setFormInitialValue({
          id,
          score,
          most_remarkable,
          challenge,
        });
      } else {
        setFormInitialValue({
          score: null,
          challenge: "",
          most_remarkable: "",
        });
      }
    } catch (e: any) {
      Toaster("error", e.message);
    }
  };

  const handleDateChange = (date: Moment.Moment) => {
    setCalenderView((prevState) => !prevState);
    setDate(date);
  };
  const handleSubmit = async (
    value: FormInitialValue,
    formikHelpers: FormikHelpers<FormInitialValue>
  ) => {
    try {
      let responseData: FormInitialValue;
      if ("id" in value) {
        const { id, ...body } = value;
        const { data }: { data: { responseData: FormInitialValue } } =
          await updateEmotionalThermometerDetails(id, body);
        responseData = data.responseData;
        Toaster("success", "Successfully updated!");
      } else {
        const { data }: { data: { responseData: FormInitialValue } } =
          await saveEmotionalThermometerDetails({
            ...value,
            date: date.toDate(),
            id_class: classDetails.id,
          });
        responseData = data.responseData;
        Toaster("success", "Successfully Saved!");
      }
      setFormInitialValue(responseData);
      setEditable(true);
    } catch (e: any) {
      Toaster("error", e.message);
    } finally {
      formikHelpers.setSubmitting(false);
    }
  };
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
          <div className={"header__date"}>{date.format("MMMM DD, yyyy")}</div>
        </div>
        <button
          className={"calender__icon"}
          onClick={() => setCalenderView((prevState) => !prevState)}
        >
          {calenderView ? <ArrowBackIosIcon className={"back__arrow"} /> : ""}
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
              enableReinitialize
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
        <ThermometerCalender date={date} handleDateChange={handleDateChange} />
      )}
    </Styled.EmotionalThermometerContainer>
  );
};
export default EmotionalThermometer;

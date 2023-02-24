import { FC, useEffect, useState } from "react";
import { EmotionalThermometerContainer, EmojiRadio } from "./styled";
import Moment from "moment";
import { Tooltip, Typography, Fade, Chip, IconButton, Button, FormControl, RadioGroup, FormControlLabel, Radio, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { ClassClimateMeter, TodayReviews } from "./sub-components";
import { Formik, Form, FormikHelpers, useFormikContext } from "formik";
import * as Yup from "yup";
import {
  EmotionalThermometerProps,
  EmotionalThermometerType,
  FormInitialValue,
} from "./interfaces";
import ThermometerCalender from "./sub-components/ThermometerCalender";
import { Moment as MomentType } from "moment/moment";
import Toaster from "../../utils/Toster";
import {
  getEmotionalThermometerByClassId,
  saveEmotionalThermometerDetails,
  updateEmotionalThermometerDetails,
} from "../../services/emotional_thermometer";
import HelpIcon from '@mui/icons-material/Help';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AngryIconOutlined from "components/SVG/AngryIconOutlined";
import AngryIconFilled from "components/SVG/AngryIconFilled";
import SadIconOutlined from "components/SVG/SadIconOutlined";
import SadIconFilled from "components/SVG/SadIconFilled";
import NeutralIconOutlined from "components/SVG/NeutralIconOutlined";
import NeutralIconFilled from "components/SVG/NeutralIconFilled";
import GoodIconOutlined from "components/SVG/GoodIconOutlined";
import GoodIconFilled from "components/SVG/GoodIconFilled";
import HappyIconOutlined from "components/SVG/HappyIconOutlined";
import HappyIconFilled from "components/SVG/HappyIconFilled";

const challenges = [
  'Obstáculo 1',
  'Obstáculo 2',
  'Obstáculo 3',
];

const achievements = [
  'Logro 1',
  'Logro 2',
  'Logro 3',
];

const radioOptions = [
  {
    text: 'Muy malo',
    value: 0,
    icon: <AngryIconOutlined />,
    selectedIcon: <AngryIconFilled />,    
  },
  {
    text: 'Malo',
    value: 1,
    icon: <SadIconOutlined />,
    selectedIcon: <SadIconFilled />,    
  },
  {
    text: 'Neutral',
    value: 2,
    icon: <NeutralIconOutlined />,
    selectedIcon: <NeutralIconFilled />,    
  },
  {
    text: 'Bueno',
    value: 3,
    icon: <GoodIconOutlined />,
    selectedIcon: <GoodIconFilled />,    
  },
  {
    text: 'Muy bueno',
    value: 4,
    icon: <HappyIconOutlined />,
    selectedIcon: <HappyIconFilled />,    
  },
];

const initialValues: FormInitialValue = {
  score: null,
  challenge: "",
  achievement: "",
};

const EmotionalThermometer: FC<EmotionalThermometerProps> = ({
  classDetails,
}) => {
  const [date, setDate] = useState<MomentType>(Moment());
  const [calenderView, setCalenderView] = useState<boolean>(false);
  const [formInitialValue, setFormInitialValue] = useState<FormInitialValue>(initialValues);
  const [form, setForm] = useState<FormInitialValue>(formInitialValue)
  const [editable, setEditable] = useState<boolean>(false);

  const validationSchema = () => {
    return Yup.object().shape({
      score: Yup.number().required(),
      challenge: Yup.string().required(),
      achievement: Yup.string().required(),
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
        const { id, score, achievement, challenge } = responseData[0];
        setFormInitialValue({
          id,
          score,
          achievement,
          challenge,
        });
      } else {
        setFormInitialValue({
          score: null,
          challenge: "",
          achievement: "",
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
    <EmotionalThermometerContainer>
      <div className="container__header mb-4">
        <div>
          <div className="d-flex align-items-center">
            <Typography className="me-2" component="h6" variant="h6" fontWeight="bold">Termómetro socioemocional</Typography>
            <Tooltip title="Delete" placement="right" TransitionComponent={Fade}>
              <HelpIcon sx={{ opacity: 0.8, cursor: 'pointer', fontSize: '20px' }} />
            </Tooltip>
          </div>
          <Typography component="span" variant="body1" sx={{ opacity: '0.6' }}>{date.format("LL")}</Typography>
        </div>
        <Button variant="outlined" startIcon={<CalendarMonthIcon />}>
          Ver calendario
        </Button>
      </div>
      {!calenderView ? (
        <>
          <Chip className="w-100" sx={{ padding: '20px 0px'}} color="secondary" label={<Typography component="span" variant="body2" fontWeight="bold">¡Completa esta sección al final de cada clase!</Typography>} />          
          <div className="mt-5">
            {/*<Formik
              enableReinitialize
              initialValues={formInitialValue}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              <Form>
                <ClassClimateMeter editable={editable} />
                <TodayReviews
                  editable={editable}
                  setEditable={setEditable}
                />
              </Form>
            </Formik>*/}
            <Formik
              enableReinitialize
              initialValues={formInitialValue}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              <EmotionalThermometerForm />
            </Formik>            
          </div>
        </>
      ) : (
        <ThermometerCalender
          classId={classDetails.id}
          date={date}
          handleDateChange={handleDateChange}
        />
      )}
    </EmotionalThermometerContainer>
  );
};

const EmotionalThermometerForm = () => {
  const { handleChange, values, setFieldValue, errors, submitCount, isValid, dirty } = useFormikContext<FormInitialValue>();
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => setFieldValue("score", e.target.value);

  return (
    <Form>
      <FormControl className="d-flex flex-column mb-4">
        <Typography component="label" variant="body1" fontWeight="bold" className="mb-2">¿Cómo fue el clima en el curso el día de hoy?</Typography>
        <RadioGroup name="climate-meter" row value={values.score} onChange={handleRadioChange} sx={{ justifyContent: 'center' }}>
          {radioOptions.map((option, i) => (
            <FormControlLabel key={`radio-option-${i}`} value={option.value} label={<Typography component="span" variant="caption">{option.text}</Typography>} labelPlacement="bottom" control={<EmojiRadio icon={option.icon} checkedIcon={option.selectedIcon} />} />
          ))}                  
        </RadioGroup>
      </FormControl>
      <FormControl className="w-100 mb-4">
        <Typography component="label" variant="body1" fontWeight="bold" className="mb-2">¿Cuál fue el mayor obstáculo de hoy?</Typography>
        <Select
          name="challenge"
          size="small"
          placeholder="El mayor obstáculo fue..."
          onChange={handleChange}
          value={values.challenge}
        >
          <MenuItem value="" disabled>El mayor obstáculo fue...</MenuItem>
          {challenges.map((challenge, i) => <MenuItem value={challenge} key={`challenges-${i}`}>{challenge}</MenuItem>)}
        </Select>
      </FormControl>
      <FormControl className="w-100 mb-5">
        <Typography component="label" variant="body1" fontWeight="bold" className="mb-2">¿Cuál fue el mayor logro de hoy?</Typography>
        <Select
          name="achievement"
          size="small"
          placeholder="El mayor logro fue..."
          onChange={handleChange}
          value={values.achievement}
        >
          <MenuItem value="" disabled>El mayor logro fue...</MenuItem>
          {achievements.map((achievement, i) => <MenuItem value={achievement} key={`achievement-${i}`}>{achievement}</MenuItem>)}
        </Select>
      </FormControl>
      <div className="d-flex justify-content-center">
        <Button color="primary" variant="contained" size="large" type="submit">Guardar Termómetro Socioemocional</Button>
      </div>                
    </Form>
  )
};
export default EmotionalThermometer;

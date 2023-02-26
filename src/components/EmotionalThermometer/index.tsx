import { FC, useEffect, useState } from "react";
import { EmotionalThermometerContainer, EmojiRadio, EmotionalThermometerActions } from "./styled";
import Moment from "moment";
import { Tooltip, Typography, Fade, Chip, Button, FormControl, RadioGroup, FormControlLabel, Select, MenuItem } from "@mui/material";
import { Formik, Form, FormikHelpers, useFormikContext } from "formik";
import * as Yup from "yup";
import {
  EmotionalThermometerFormProps,
  EmotionalThermometerProps,
  EmotionalThermometerType,
  FormInitialValue,
} from "./interfaces";
import ThermometerCalendar from "./sub-components/ThermometerCalendar";
import { Moment as MomentType } from "moment/moment";
import Toaster from "../../utils/Toster";
import {
  getEmotionalThermometerByClassId,
  saveEmotionalThermometerDetails,
  updateEmotionalThermometerDetails,
} from "../../services/emotional_thermometer";
import HelpIcon from '@mui/icons-material/Help';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { radioOptions, challengeOptions, mostRemarkableOptions } from "./form-options";

const initialValues: FormInitialValue = {
  score: null,
  challenge: "",
  most_remarkable: "",
};

const validationSchema = () => {
  return Yup.object().shape({
    score: Yup.number().required(),
    challenge: Yup.string().required(),
    most_remarkable: Yup.string().required(),
  });
};

const EmotionalThermometer: FC<EmotionalThermometerProps> = ({
  classDetails,
}) => {
  const [date, setDate] = useState<MomentType>(Moment());
  const [calendarView, setCalendarView] = useState<boolean>(false);
  const [formInitialValue, setFormInitialValue] = useState<FormInitialValue>(initialValues);
  const [editable, setEditable] = useState<boolean>(false);

  useEffect(() => {
    if (classDetails) handleGetThermometerDetails(classDetails.id);
  }, [date, classDetails]);

  const handleGetThermometerDetails = async (classId: string | number) => {
    try {
      const { data: { responseData },
      }: { data: { responseData: EmotionalThermometerType[] } } =
        await getEmotionalThermometerByClassId(
          classId,
          date.toDate(),
          date.toDate()
        );

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
      setEditable(!responseData.length);
    } catch (e: any) {
      Toaster("error", e.message);
    }
  };

  const handleDateChange = (date: Moment.Moment) => {
    setCalendarView((prevState) => !prevState);
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
      setEditable(false);
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
        <Button variant="outlined" startIcon={<CalendarMonthIcon />} onClick={() => setCalendarView(true)}>
          Ver calendario
        </Button>
      </div>
      {!calendarView ? (
        <>
          <Chip className="w-100" sx={{ padding: '20px 0px'}} color="secondary" label={<Typography component="span" variant="body2" fontWeight="bold">¡Completa esta sección al final de cada clase!</Typography>} />          
          <div className="mt-5">
            <Formik
              enableReinitialize
              initialValues={formInitialValue}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              <EmotionalThermometerForm editable={editable} setEditable={setEditable} />              
            </Formik>
          </div>
        </>
      ) : (
        <ThermometerCalendar date={date} handleDateChange={handleDateChange} />
      )}
    </EmotionalThermometerContainer>
  );
};

const EmotionalThermometerForm: React.FC<EmotionalThermometerFormProps> = ({ editable = true, setEditable }) => {
  const { handleChange, values, setFieldValue, errors, submitCount, isValid, dirty } = useFormikContext<FormInitialValue>();
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => setFieldValue("score", parseInt(e.target.value));  
  
  return (
    <Form className={editable ? '' : 'disabled'}>
      <FormControl className="d-flex flex-column mb-4" error={!!errors.score && !!submitCount} disabled={!editable}>
        <Typography component="label" variant="body1" fontWeight="bold" className="mb-2">¿Cómo fue el clima en el curso el día de hoy?</Typography>
        <RadioGroup name="climate-meter" row value={values.score} onChange={handleRadioChange} sx={{ justifyContent: 'center' }}>
          {radioOptions.map((option, i) => (
            <FormControlLabel key={`radio-option-${i}`} value={option.value} label={<Typography component="span" variant="caption">{option.text}</Typography>} labelPlacement="bottom" control={<EmojiRadio icon={option.icon} checkedIcon={option.selectedIcon} />} />
          ))}                  
        </RadioGroup>
      </FormControl>
      <FormControl className="w-100 mb-4" error={!!errors.challenge && !!submitCount} disabled={!editable}>
        <Typography component="label" variant="body1" fontWeight="bold" className="mb-2">¿Cuál fue el mayor obstáculo de hoy?</Typography>
        <Select
          name="challenge"
          size="small"
          placeholder="El mayor obstáculo fue..."
          onChange={handleChange}
          value={values.challenge}
        >
          <MenuItem value="" disabled>El mayor obstáculo fue...</MenuItem>
          {challengeOptions.map((challenge, i) => <MenuItem value={challenge} key={`challenges-${i}`}>{challenge}</MenuItem>)}
        </Select>
      </FormControl>
      <FormControl className="w-100 mb-5" error={!!errors.most_remarkable && !!submitCount} disabled={!editable}>
        <Typography component="label" variant="body1" fontWeight="bold" className="mb-2">¿Cuál fue el mayor logro de hoy?</Typography>
        <Select
          name="most_remarkable"
          size="small"
          placeholder="El mayor logro fue..."
          onChange={handleChange}
          value={values.most_remarkable}
        >
          <MenuItem value="" disabled>El mayor logro fue...</MenuItem>
          {mostRemarkableOptions.map((most_remarkable, i) => <MenuItem value={most_remarkable} key={`most_remarkable-${i}`}>{most_remarkable}</MenuItem>)}
        </Select>
      </FormControl>
      <EmotionalThermometerActions>
        {editable ? (
          <div className="d-flex justify-content-center">
            <Button disabled={!isValid} color="primary" variant="contained" size="large" type="submit">Guardar Termómetro Socioemocional</Button>
          </div>
        ) : (
          <div className="d-flex flex-column align-items-center">
            <Typography component="span" variant="body2">Ya completaste el termómetro socioemocional de hoy</Typography>
            <Button          
              className={"again__action"}
              role={"button"}
              onClick={() => setEditable(true)}
            >
              Rehacer
            </Button>
          </div>        
        )}
      </EmotionalThermometerActions>      
    </Form>
  )
};
export default EmotionalThermometer;
import { FC, useEffect, useRef, useState } from "react";
import {
  EmotionalThermometerContainer,
  EmojiRadio,
  EmotionalThermometerActions,
  PickersDateContainer,
} from "./styled";
import Moment from "moment";
import {
  Tooltip,
  Typography,
  Fade,
  Chip,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import {
  EmotionalThermometerProps,
  EmotionalThermometerType,
  FormInitialValue,
} from "./interfaces";
import { Moment as MomentType } from "moment/moment";
import Toaster from "../../utils/Toster";
import {
  getEmotionalThermometerByClassId,
  saveEmotionalThermometerDetails,
  updateEmotionalThermometerDetails,
} from "../../services/emotional_thermometer";
import HelpIcon from "@mui/icons-material/Help";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import {
  radioOptions,
  challengeOptions,
  mostRemarkableOptions,
} from "./form-options";
import { CalendarMonth } from "@mui/icons-material";
import {
  LocalizationProvider,
  DatePicker,
  PickersDayProps,
  PickersDay,
} from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

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
  const [detailsByDates, setDetailsByDates] = useState<
    EmotionalThermometerType[]
  >([]);
  const [calendarIsOpen, setCalendarOpen] = useState<boolean>(false);
  const [formInitialValue, setFormInitialValue] =
    useState<FormInitialValue>(initialValues);
  const [editable, setEditable] = useState<boolean>(false);
  const formRef = useRef(null);

  useEffect(() => {
    if (classDetails) {
      handleGetThermometerDetails();
      handleMonthChange();
    }
  }, [date, classDetails]);

  const handleGetThermometerDetails = async () => {
    try {
      const {
        data: { responseData },
      }: { data: { responseData: EmotionalThermometerType[] } } =
        await getEmotionalThermometerByClassId(
          classDetails.id,
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
          ...{
            score: null,
            challenge: "",
            most_remarkable: "",
          },
        });
      }
      setEditable(!responseData.length);
    } catch (error: any) {
      console.error(error);
      Toaster("error", "Hubo un error al cargar los termómetros de la clase");
    }
  };

  const checkDate = (date: MomentType): Boolean => {
    return detailsByDates.some((res) =>
      Moment(res.date).startOf("day").isSame(date, "day")
    );
  };

  const handleMonthChange = async () => {
    try {
      const {
        data: { responseData },
      }: { data: { responseData: EmotionalThermometerType[] } } =
        await getEmotionalThermometerByClassId(
          classDetails.id,
          Moment(date).startOf("month").toDate(),
          Moment(date).endOf("month").toDate()
        );
      setDetailsByDates(responseData);
    } catch (error: any) {
      console.error(error);
      Toaster("error", "Hubo un error al cargar los termómetros del mes");
    }
  };

  const customRenderDay = (
    day: MomentType | unknown,
    selectedDays: MomentType[] | unknown[],
    pickersDayProps: PickersDayProps<MomentType> | PickersDayProps<unknown>
  ) => {
    return (
      <PickersDateContainer key={pickersDayProps.key}>
        <PickersDay
          day={day}
          outsideCurrentMonth={false}
          {...(pickersDayProps as PickersDayProps<MomentType>)}
        />
        {!pickersDayProps.outsideCurrentMonth &&
          checkDate(day as MomentType) && (
            <span className={"tick__icon"}>&#10004;</span>
          )}
      </PickersDateContainer>
    );
  };

  const handleDateChange = (date: Moment.Moment) => {
    formRef.current?.resetForm();
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
        Toaster("success", "Termómetro actualizado exitosamente");
      } else {
        const { data }: { data: { responseData: FormInitialValue } } =
          await saveEmotionalThermometerDetails({
            ...value,
            date: date.toDate(),
            id_class: classDetails.id,
          });
        responseData = data.responseData;
        Toaster("success", "Termómetro guardado exitosamente");
      }
      formikHelpers.resetForm();
      setEditable(false);
    } catch (error: any) {
      console.error(error);
      Toaster("error", "Hubo un error al guardar el termómetro");
    } finally {
      formikHelpers.setSubmitting(false);
    }
  };

  return (
    <EmotionalThermometerContainer>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <div className="d-flex align-items-center">
            <Typography
              className="me-2"
              component="h6"
              variant="h6"
              fontWeight="bold"
            >
              Termómetro socioemocional
            </Typography>
            <Tooltip
              title="El termómetro socioemocional es una herramienta que nos permitirá hacer seguimiento del clima escolar del curso a lo largo del tiempo. ¡Es importantísimo llenarlo cada clase para poder entregarte reportes de calidad!"
              placement="right"
              TransitionComponent={Fade}
            >
              <HelpIcon
                sx={{ opacity: 0.8, cursor: "pointer", fontSize: "20px" }}
              />
            </Tooltip>
          </div>
          <div className="d-flex align-items-center">
            <Typography
              className="me-1"
              component="span"
              variant="body1"
              sx={{ opacity: "0.6" }}
            >
              {date.format("LL")}
            </Typography>
            {formInitialValue.id ? (
              <EventAvailableIcon color="success" sx={{ fontSize: "18px" }} />
            ) : null}
          </div>
        </div>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker
            open={calendarIsOpen}
            onClose={() => setCalendarOpen(false)}
            renderDay={customRenderDay}
            minDate={Moment().subtract(30, "day")}
            maxDate={Moment()}
            value={date}
            onChange={(newDate) => handleDateChange(Moment(newDate))}
            renderInput={({ inputRef }) => (
              <div ref={inputRef}>
                <Button
                  variant="outlined"
                  startIcon={<CalendarMonth />}
                  onClick={() => setCalendarOpen(!calendarIsOpen)}
                >
                  Editar otra fecha
                </Button>
              </div>
            )}
          />
        </LocalizationProvider>
      </div>
      <>
        <Chip
          className="w-100"
          sx={{ padding: "20px 0px" }}
          color="secondary"
          label={
            <Typography component="span" variant="body2" fontWeight="bold">
              ¡Completa esta sección al final de cada clase!
            </Typography>
          }
        />
        <div className="mt-5">
          <Formik
            enableReinitialize
            initialValues={formInitialValue}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            innerRef={formRef}
          >
            {({
              errors,
              submitCount,
              handleChange,
              values,
              isValid,
              dirty,
              setFieldValue,
            }: any) => (
              <Form className={editable ? "" : "disabled"}>
                <FormControl
                  className="d-flex flex-column mb-4"
                  error={!!errors.score && !!submitCount}
                  disabled={!editable}
                >
                  <Typography
                    component="label"
                    variant="body1"
                    fontWeight="bold"
                    className="mb-2"
                  >
                    ¿Cómo fue el clima en el curso el día de hoy?
                  </Typography>
                  <RadioGroup
                    name="climate-meter"
                    row
                    value={values.score}
                    onChange={(e) =>
                      setFieldValue("score", parseInt(e.target.value))
                    }
                    sx={{ justifyContent: "center" }}
                  >
                    {radioOptions.map((option, i) => (
                      <FormControlLabel
                        key={`radio-option-${i}`}
                        value={option.value}
                        label={
                          <Typography component="span" variant="caption">
                            {option.text}
                          </Typography>
                        }
                        labelPlacement="bottom"
                        control={
                          <EmojiRadio
                            icon={option.icon}
                            checkedIcon={option.selectedIcon}
                          />
                        }
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormControl
                  className="w-100 mb-4"
                  error={!!errors.challenge && !!submitCount}
                  disabled={!editable}
                >
                  <Typography
                    component="label"
                    variant="body1"
                    fontWeight="bold"
                    className="mb-2"
                  >
                    ¿Cuál fue el mayor obstáculo de hoy?
                  </Typography>
                  <Select
                    name="challenge"
                    size="small"
                    placeholder="El mayor obstáculo fue..."
                    onChange={handleChange}
                    value={values.challenge}
                  >
                    <MenuItem value="" disabled>
                      El mayor obstáculo fue...
                    </MenuItem>
                    {challengeOptions.map((challenge, i) => (
                      <MenuItem value={challenge} key={`challenges-${i}`}>
                        {challenge}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl
                  className="w-100 mb-4"
                  error={!!errors.most_remarkable && !!submitCount}
                  disabled={!editable}
                >
                  <Typography
                    component="label"
                    variant="body1"
                    fontWeight="bold"
                    className="mb-2"
                  >
                    ¿Cuál fue el mayor logro de hoy?
                  </Typography>
                  <Select
                    name="most_remarkable"
                    size="small"
                    placeholder="El mayor logro fue..."
                    onChange={handleChange}
                    value={values.most_remarkable}
                  >
                    <MenuItem value="" disabled>
                      El mayor logro fue...
                    </MenuItem>
                    {mostRemarkableOptions.map((most_remarkable, i) => (
                      <MenuItem
                        value={most_remarkable}
                        key={`most_remarkable-${i}`}
                      >
                        {most_remarkable}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <EmotionalThermometerActions className="d-flex align-items-end justify-content-center">
                  {editable ? (
                    <div className="d-flex justify-content-center">
                      <Button
                        disabled={!isValid || !dirty}
                        color="primary"
                        variant="contained"
                        size="large"
                        type="submit"
                      >
                        Guardar Termómetro Socioemocional
                      </Button>
                    </div>
                  ) : (
                    <div className="d-flex flex-column align-items-center">
                      <Typography component="span" variant="body2">
                        Ya completaste el termómetro socioemocional de hoy
                      </Typography>
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
            )}
          </Formik>
        </div>
      </>
    </EmotionalThermometerContainer>
  );
};

export default EmotionalThermometer;

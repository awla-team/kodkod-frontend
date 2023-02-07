import { FC } from "react";
import * as Styled from "./styled";
import {
  Button,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useFormikContext } from "formik";
import { FormInitialValue } from "../interfaces";
import { TodayReviewsProps } from "./interfaces";

export const TodayReviews: FC<TodayReviewsProps> = ({
  editable,
  setEditable,
}) => {
  const { handleChange, values, errors, submitCount, isValid, dirty } =
    useFormikContext<FormInitialValue>();
  return (
    <Styled.TodayReviewQuestionsContainer>
      <FormControl fullWidth error={!!errors.challenge && !!submitCount}>
        <FormLabel className={"form__label"}>
          What was the biggest challenge?
        </FormLabel>
        <Select
          disabled={editable}
          name={"challenge"}
          onChange={handleChange}
          value={values.challenge}
        >
          <MenuItem value={"Jugaron pinon"}>Jugaron pinon</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth error={!!errors.remarkable && !!submitCount}>
        <FormLabel className={"form__label"}>
          What was the most remarkable?
        </FormLabel>
        <Select
          disabled={editable}
          name={"remarkable"}
          onChange={handleChange}
          value={values.remarkable}
        >
          <MenuItem value={"Ganó el equipo de los malos"}>
            Ganó el equipo de los malos
          </MenuItem>
        </Select>
      </FormControl>

      {!editable ? (
        <Styled.ActionButton
          disabled={!isValid || !dirty}
          variant={"contained"}
          type={"submit"}
        >
          Save Emotional Thermometer
        </Styled.ActionButton>
      ) : (
        <>
          <div className={"completed__text"}>
            You already completed the Emotional Thermometer today
          </div>
          <div
            className={"again__action"}
            role={"button"}
            onClick={() => setEditable(false)}
          >
            Do it again
          </div>
        </>
      )}
    </Styled.TodayReviewQuestionsContainer>
  );
};

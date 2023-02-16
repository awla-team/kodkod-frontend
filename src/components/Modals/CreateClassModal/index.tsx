import type { FC, ChangeEvent } from "react";
import { CreateClassModalProps, FormInitialState } from "./interfaces";
import {
  IconButton,
  Select,
  MenuItem,
  FormControl,
  TextField,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import * as Styled from "./styled";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { createClass } from "services/classes";
import Toaster from "utils/Toster";

const CreateClassModal: FC<CreateClassModalProps> = ({
  open,
  onClose,
  levels,
}) => {
  const [initialState, setInitialState] = useState<FormInitialState>({
    id_level: "",
    code: "",
    alias: "",
  });
  const validationSchema = () => {
    return Yup.object().shape({
      id_level: Yup.number().required(),
      code: Yup.string().required(),
      alias: Yup.string().required(),
    });
  };

  const handleAliasValue = (
    e: ChangeEvent,
    values: FormInitialState,
    setFieldValue: FormikHelpers<FormInitialState>["setFieldValue"]
  ) => {
    if (e) {
      const { name, value } = e.target as HTMLInputElement;
      if (name === "level") {
        setFieldValue("alias", `${value}°${values.code}`);
      } else {
        setFieldValue("alias", `${values.id_level}°${value}`);
      }
    }
  };

  const handleSubmit = async (
    values: FormInitialState,
    formikHelpers: FormikHelpers<FormInitialState>
  ) => {
    try {
      await createClass({
        ...values,
        id_user: 1,
        id_level: values.id_level as number,
      });
      onClose("success");
      Toaster("success", `You successfully added the ${values.alias} class.`);
    } catch (e: any) {
      Toaster("error", e.message);
    } finally {
      formikHelpers.setSubmitting(false);
    }
  };
  return (
    <Styled.DialogBox
      open={open}
      fullWidth={true}
      maxWidth={"sm"}
      scroll={"body"}
      disableEscapeKeyDown
    >
      <Styled.DialogBoxTitle>
        <IconButton color={"inherit"} onClick={() => onClose("escapeKeyDown")}>
          <CloseIcon />
        </IconButton>
      </Styled.DialogBoxTitle>
      <Styled.DialogBoxContent>
        <h1 className={"dialog__header__text"}>Add new class</h1>

        <Formik
          initialValues={initialState}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({
            handleSubmit,
            handleChange,
            values,
            errors,
            submitCount,
            setFieldValue,
            isSubmitting,
            isValid,
            dirty,
          }) => {
            return (
              <Form onSubmit={handleSubmit}>
                <Styled.DialogFormContainer>
                  <FormControl error={!!errors.id_level && !!submitCount}>
                    <Styled.DialogFormLabel>Level</Styled.DialogFormLabel>
                    <Select
                      name={"id_level"}
                      onChange={(e) => {
                        handleAliasValue(
                          e as ChangeEvent<HTMLInputElement>,
                          values,
                          setFieldValue
                        );
                        handleChange(e);
                      }}
                      value={values.id_level}
                    >
                      <MenuItem value={""} disabled>
                        Select a level
                      </MenuItem>
                      {levels.map((res, index) => {
                        return (
                          <MenuItem key={index} value={res.id}>
                            {res.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                  <FormControl error={!!errors.code && !!submitCount}>
                    <Styled.DialogFormLabel>
                      Code{" "}
                      <span className={"helper__text"}>
                        (It is the letter that accompanies the level and that
                        identifies the class)
                      </span>
                    </Styled.DialogFormLabel>
                    <TextField
                      name={"code"}
                      onChange={(e) => {
                        handleAliasValue(e, values, setFieldValue);
                        handleChange(e);
                      }}
                      value={values.code}
                      variant={"standard"}
                    />
                  </FormControl>
                  <FormControl error={!!errors.alias && !!submitCount}>
                    <Styled.DialogFormLabel>
                      Alias{" "}
                      <span className={"helper__text"}>
                        (It is usually the level + the class code)
                      </span>
                    </Styled.DialogFormLabel>
                    <TextField
                      name={"alias"}
                      onChange={handleChange}
                      value={values.alias}
                      variant={"standard"}
                    />
                  </FormControl>
                  <Styled.DialogFormActions>
                    <Button
                      disabled={isSubmitting || !isValid || !dirty}
                      type={"submit"}
                      variant={"contained"}
                    >
                      Add class
                    </Button>
                  </Styled.DialogFormActions>
                </Styled.DialogFormContainer>
              </Form>
            );
          }}
        </Formik>
      </Styled.DialogBoxContent>
    </Styled.DialogBox>
  );
};

export default CreateClassModal;

import type { FC, ChangeEvent } from "react";
import { CreateClassModalProps, FormInitialState } from "./interfaces";
import {
  Select,
  MenuItem,
  FormControl,
  TextField,
  Button,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import { FormContainer } from "./styled";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { createClass } from "services/classes";
import Toaster from "utils/Toster";
import { ClassInterface } from "../../../services/classes/interfaces";

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
// extract first char from string 
  const handleAliasValue = (
    e: ChangeEvent,
    values: FormInitialState,
    setFieldValue: FormikHelpers<FormInitialState>["setFieldValue"]
  ) => {    
    if (e) {
      const { name, value } = e.target as HTMLInputElement;
      if (name === "id_level") {
        const level = levels.find((level) => level.id === value);
        setFieldValue("alias", `${level.name.charAt(0)}°${values.code}`);
      } else {
        const level = levels.find((level) => level.id === values.id_level);
        if (level) setFieldValue("alias", `${level.name.charAt(0)}°${value}`);
      }
    }
  };

  const handleSubmit = async (
    values: FormInitialState,
    formikHelpers: FormikHelpers<FormInitialState>
  ) => {
    try {
      const { data }: { data: { responseData: ClassInterface } } =
        await createClass({
          ...values,
          id_user: 1,
          id_level: values.id_level as number,
        });
      onClose("success", data.responseData);
      Toaster("success", `You successfully added the ${values.alias} class.`);
    } catch (e: any) {
      Toaster("error", e.message);
    } finally {
      formikHelpers.setSubmitting(false);
    }
  };
  return (
    <Dialog open={open} PaperProps={ { className: 'p-3' }}>
      <DialogTitle fontWeight="bold">Añade un nuevo curso</DialogTitle>            
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
                  <DialogContent dividers className="py-5">
                    <FormContainer>
                      <FormControl error={!!errors.id_level && !!submitCount}>
                        <Typography component="label" variant="body1" fontWeight="bold" className="mb-1">Nivel</Typography>
                        <Select
                          name={"id_level"}
                          size="small"
                          placeholder="Selecciona un nivel"
                          onChange={(e) => {                        
                            handleChange(e);
                            handleAliasValue(
                              e as ChangeEvent<HTMLInputElement>,
                              values,
                              setFieldValue
                            );
                          }}
                          value={values.id_level}
                        >
                          <MenuItem value={""} disabled>
                            Selecciona un nivel
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
                        <div className="d-flex align-items-end mb-1" >
                          <Typography component="label" variant="body1" fontWeight="bold" className="me-1">Código</Typography>
                          <Typography component="span" variant="caption">(Es la letra que acompaña al nivel e identifica al curso)</Typography>                        
                        </div>                        
                        <TextField
                          name={"code"}
                          placeholder="Ejemplo: A, B, C..."
                          onChange={(e) => {
                            handleAliasValue(e, values, setFieldValue);
                            handleChange(e);
                          }}
                          value={values.code}
                          size="small"
                        />
                      </FormControl>
                      <FormControl error={!!errors.alias && !!submitCount}>
                        <div className="d-flex align-items-end mb-1" >
                          <Typography component="label" variant="body1" fontWeight="bold" className="me-1">Alias</Typography>
                          <Typography component="span" variant="caption">(Suele ser nivel + código del curso)</Typography>                        
                        </div>                        
                        <TextField
                          name={"alias"}
                          placeholder="Ejemplo: 1°A, 2°B, 3°C..."
                          onChange={handleChange}
                          value={values.alias}
                          size="small"                          
                        />
                      </FormControl>                  
                    </FormContainer>
                  </DialogContent>
                  <DialogActions className="pt-3">
                    <Button variant="outlined" onClick={() => onClose("escapeKeyDown")}>
                      Cancelar
                    </Button>
                    <Button
                      disabled={isSubmitting || !isValid || !dirty}
                      type={"submit"}
                      variant={"contained"}
                    >
                      Añadir curso
                    </Button>                    
                  </DialogActions>
                </Form>                            
            );
          }}
        </Formik>            
    </Dialog>
  );
};

export default CreateClassModal;

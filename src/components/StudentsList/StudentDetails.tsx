import React, { FC, useEffect, useState } from "react";
import { StudentEditInputField, StudentType } from "./interfaces";
import { useClassContext } from "../../routes/Class/context";
import Toaster from "../../utils/Toster";
import { Form, Formik, FormikHelpers } from "formik";
import { updateStudent } from "../../services/students";
import {
  Avatar,
  Box,
  FormControl,
  IconButton,
  TextField,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import ConfirmationModal from "../Modals/ConfirmationModal";
import { StudentRow } from "./styled";

export const StudentDetails: FC<{
  details: StudentType;
  handleDelete: (studentId: string | number) => Promise<boolean>;
}> = ({ details, handleDelete }) => {
  const [editState, setEditState] = useState<boolean>(false);
  const [elRef, setElRef] = useState<any | null>(null);
  const [openConfirmation, setOpenConfirmation] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const { updateStudentsData } = useClassContext();
  const handleMenuOpen = (e: React.MouseEvent) => {
    setOpenMenu(true);
    const { currentTarget } = e;
    setElRef(currentTarget);
  };

  const handleConfirmationClose = () => {
    setOpenConfirmation(false);
    setElRef(null);
  };

  const handleDeleteCB = async () => {
    try {
      await handleDelete(details.id);
      Toaster("success", `Estudiante ${details.email} eliminado exitosamente`);
      setElRef(null);
      setOpenMenu(false);
      setOpenConfirmation(false);
      updateStudentsData("delete", details);
    } catch (error: any) {
      console.error(error);
      Toaster(
        "error",
        `Hubo un error al eliminar al estudiante ${details.email}`
      );
    }
  };

  const [inputValues, setInputValues] = useState<StudentEditInputField>({
    ...details,
  });

  useEffect(() => {
    if (details) {
      setInputValues({
        first_name: details.first_name,
        last_name: details.last_name,
        email: details.email,
      });
    }
  }, [details]);

  const handleSubmit = async (
    values: StudentEditInputField,
    formikHelper: FormikHelpers<StudentEditInputField>
  ) => {
    try {
      const { last_name, first_name, email } = values;
      const { data }: { data: { responseData: StudentType } } =
        await updateStudent(details.id, {
          role: "student",
          email,
          last_name,
          first_name,
        });
      Toaster("success", "Estudiante actualizado");
      setEditState(false);
      updateStudentsData("update", data.responseData);
    } catch (error: any) {
      console.error(error);
      Toaster("error", "Hubo un error al actualizar al estudiante");
    } finally {
      formikHelper.setSubmitting(false);
    }
  };

  return (
    <StudentRow
      className={`d-flex align-items-center w-100 ${
        editState ? "editable" : ""
      }`}
    >
      <Avatar className="student-avatar me-3">{`${details.first_name[0]}${details.last_name[0]}`}</Avatar>
      <Formik initialValues={inputValues} onSubmit={handleSubmit}>
        {({
          handleSubmit,
          values,
          handleChange,
          isSubmitting,
          submitCount,
          errors,
        }) => {
          return (
            <Form onSubmit={handleSubmit} className={"editable_section__form"}>
              <div className={"edit__section"}>
                <div className={"editable__field"}>
                  <Box display={"flex"} gap={1}>
                    {editState ? (
                      <FormControl error={!!errors.first_name && !!submitCount}>
                        <TextField
                          variant="standard"
                          autoFocus
                          disabled={!editState}
                          name={"first_name"}
                          className={"name"}
                          placeholder={"Nombres"}
                          value={values.first_name}
                          onChange={handleChange}
                        />
                      </FormControl>
                    ) : (
                      <Typography>{values.first_name}</Typography>
                    )}
                    {editState ? (
                      <FormControl error={!!errors.last_name && !!submitCount}>
                        <TextField
                          variant="standard"
                          disabled={!editState}
                          name={"last_name"}
                          className={"name"}
                          placeholder={"Apellidos"}
                          value={values.last_name}
                          onChange={handleChange}
                        />
                      </FormControl>
                    ) : (
                      <Typography>{values.last_name}</Typography>
                    )}
                  </Box>
                  <FormControl
                    className="mt-2"
                    error={!!errors.email && !!submitCount}
                  >
                    <TextField
                      variant="standard"
                      disabled={!editState}
                      name={"email"}
                      type={"email"}
                      className={"email"}
                      placeholder={"E-mail"}
                      value={values.email}
                      onChange={handleChange}
                    />
                  </FormControl>
                </div>
                <div className={"editable__action__section"}>
                  {editState ? (
                    <>
                      <IconButton
                        disabled={isSubmitting}
                        type={"submit"}
                        color={"primary"}
                      >
                        <CheckIcon />
                      </IconButton>
                      <IconButton
                        color={"error"}
                        onClick={() => setEditState(false)}
                      >
                        <CloseIcon />
                      </IconButton>
                    </>
                  ) : (
                    <IconButton
                      className="more-button"
                      color={"inherit"}
                      onClick={(e) => {
                        handleMenuOpen(e);
                      }}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  )}
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>

      <Menu
        elevation={1}
        open={!!elRef && openMenu}
        anchorEl={elRef}
        onClose={() => setElRef(null)}
      >
        <MenuItem
          onClick={() => {
            setEditState(true);
            setOpenMenu(false);
          }}
        >
          Editar
        </MenuItem>
        <MenuItem
          onClick={() => {
            setOpenConfirmation(true);
          }}
        >
          Eliminar
        </MenuItem>
      </Menu>
      <ConfirmationModal
        description={
          <span>
            Estás apunto de eliminar al estudiante{" "}
            <b>
              {details.first_name} {details.last_name}
            </b>
            . ¿Deseas continuar?
          </span>
        }
        open={openConfirmation}
        callBackFunction={handleDeleteCB}
        onClose={handleConfirmationClose}
      />
    </StudentRow>
  );
};

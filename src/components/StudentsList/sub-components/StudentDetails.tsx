import React, { FC, useEffect, useState } from "react";
import { StudentEditInputField, StudentType } from "../interfaces";
import { useClassContext } from "../../../routes/Class/Context";
import { useParams } from "react-router-dom";
import Toaster from "../../../utils/Toster";
import { Form, Formik, FormikHelpers } from "formik";
import { updateStudent } from "../../../services/students";
import {
  Avatar,
  FormControl,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import ConfirmationModal from "../../Modals/ConfirmationModal";

export const StudentDetails: FC<{
  details: StudentType;
  handleDelete: (studentId: string | number) => Promise<boolean>;
}> = ({ details, handleDelete }) => {
  const [editState, setEditState] = useState<boolean>(false);
  const [elRef, setElRef] = useState<any | null>(null);
  const [openConfirmation, setOpenConfirmation] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const { updateStudentsData } = useClassContext();
  const { classId } = useParams();
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
      Toaster("success", `${details.email} deleted successfully.`);
      setElRef(null);
      setOpenMenu(false);
      setOpenConfirmation(false);
    } catch (e: any) {
      Toaster("error", e.message);
    }
  };

  const [inputValues, setInputValues] = useState<StudentEditInputField>({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (details) {
      setInputValues({
        name: `${details.first_name} ${details.last_name}`,
        email: details.email,
      });
    }
  }, [details]);

  const handleSubmit = async (
    values: StudentEditInputField,
    formikHelper: FormikHelpers<StudentEditInputField>
  ) => {
    try {
      const { name, email } = values;
      const [first_name, last_name] = name.split(" ");
      const { data }: { data: { responseData: StudentType } } =
        await updateStudent(details.id, {
          role: "student",
          email,
          last_name,
          first_name,
        });
      Toaster("success", "Student Details updated");
      setEditState(false);
      updateStudentsData(data.responseData);
    } catch (e: any) {
      Toaster("error", e.message);
    } finally {
      formikHelper.setSubmitting(false);
    }
  };

  return (
    <>
      <Avatar />
      {!editState ? (
        <div className={"student__details__container"}>
          <div className={"student__details"}>
            <div
              className={"student__name"}
            >{`${details.first_name} ${details.last_name}`}</div>
            <div className={"student__email"}>{details.email}</div>
          </div>
          <IconButton
            color={"inherit"}
            onClick={(e) => {
              handleMenuOpen(e);
            }}
          >
            <MoreVertIcon />
          </IconButton>
        </div>
      ) : (
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
              <Form
                onSubmit={handleSubmit}
                className={"editable_section__form"}
              >
                <div className={"edit__section"}>
                  <div className={"editable__field"}>
                    <FormControl error={!!errors.name && !!submitCount}>
                      <InputBase
                        name={"name"}
                        className={"name"}
                        placeholder={"name"}
                        value={values.name}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl error={!!errors.email && !!submitCount}>
                      <InputBase
                        name={"email"}
                        type={"email"}
                        className={"email"}
                        placeholder={"email"}
                        value={values.email}
                        onChange={handleChange}
                      />
                    </FormControl>
                  </div>
                  <div className={"editable__action__section"}>
                    <IconButton
                      color={"error"}
                      onClick={() => setEditState(false)}
                    >
                      <CloseIcon />
                    </IconButton>
                    <IconButton
                      disabled={isSubmitting}
                      type={"submit"}
                      color={"success"}
                    >
                      <CheckIcon />
                    </IconButton>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      )}

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
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            setOpenConfirmation(true);
          }}
        >
          Delete
        </MenuItem>
      </Menu>

      <ConfirmationModal
        open={openConfirmation}
        callBackFunction={handleDeleteCB}
        onClose={handleConfirmationClose}
      />
    </>
  );
};

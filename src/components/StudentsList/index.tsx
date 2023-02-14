import {
  DontHaveDetailsContent,
  StudentDetailBox,
  StudentListContainer,
  StudentListContent,
  StudentsListDetailsContainer,
} from "./styled";
import React, { Dispatch, FC, SetStateAction, useEffect } from "react";
import {
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  InputBase,
  FormControl,
} from "@mui/material";
import {
  StudentEditInputField,
  StudentsListProps,
  StudentType,
} from "./interfaces";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import AddStudentsDialog from "../Modals/AddStudentsDialog";
import { useClassContext } from "../../routes/Class/Context";
import { useParams } from "react-router-dom";
import { deleteStudent, updateStudent } from "../../services/students";
import Toaster from "../../utils/Toster";
import ConfirmationModal from "../Modals/ConfirmationModal";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { StudentDetails } from "./sub-components";

const StudentsList: FC<StudentsListProps> = ({
  studentsData,
  classDetails,
}: StudentsListProps) => {
  const [OpenModal, setOpenModal] = useState<boolean>(false);
  const { getStudentsByClass } = useClassContext();
  const { classId } = useParams();
  const handleModalClose = (reason: "success" | undefined) => {
    if (reason === "success") {
      if (classId) getStudentsByClass(classId);
    }
    setOpenModal(false);
  };

  // temporary approcah
  const handleDelete = (studentId: string | number): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        if (studentId) {
          await deleteStudent(studentId);
          resolve(true);
        }
        reject({ message: "Student id didn't find." });
      } catch (e: any) {
        reject(e);
      }
    });
  };
  return (
    <StudentListContainer>
      <h1 className={"header__text"}>Students list</h1>
      <StudentListContent hasDetails={!!studentsData.length}>
        {studentsData.length ? (
          <StudentsListDetails
            handleDelete={handleDelete}
            studentsData={studentsData}
            setOpenModal={setOpenModal}
          />
        ) : (
          <DontHaveDetails setOpenModal={setOpenModal} />
        )}
      </StudentListContent>
      {OpenModal && (
        <AddStudentsDialog
          classDetails={classDetails}
          open={OpenModal}
          onClose={handleModalClose}
        />
      )}
    </StudentListContainer>
  );
};

export default StudentsList;
const DontHaveDetails: FC<{
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}> = ({ setOpenModal }) => {
  return (
    <DontHaveDetailsContent>
      <span className={"helper__text"}>
        Your class has no associated students yet
      </span>
      <Button variant={"contained"} onClick={() => setOpenModal(true)}>
        Add students
      </Button>
    </DontHaveDetailsContent>
  );
};

const StudentsListDetails: FC<{
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  studentsData: StudentType[];
  handleDelete: (studentId: string | number) => Promise<boolean>;
}> = ({ setOpenModal, handleDelete, studentsData }) => {
  return (
    <StudentsListDetailsContainer>
      <div className={"details"}>
        {studentsData.map((res, index) => {
          return (
            <StudentDetailBox key={`${index}-${res.id}`}>
              <StudentDetails details={res} handleDelete={handleDelete} />
            </StudentDetailBox>
          );
        })}
      </div>

      <Button variant={"contained"} onClick={() => setOpenModal(true)}>
        Add students
      </Button>
    </StudentsListDetailsContainer>
  );
};

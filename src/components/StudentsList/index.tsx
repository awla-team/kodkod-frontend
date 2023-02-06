import {
  DontHaveDetailsContent,
  StudentDetailBox,
  StudentListContainer,
  StudentListContent,
  StudentsListDetailsContainer,
} from "./styled";
import React, { Dispatch, FC, SetStateAction } from "react";
import { Avatar, Button, IconButton, Menu, MenuItem } from "@mui/material";
import { StudentsListProps, StudentType } from "./interfaces";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import AddStudentsDialog from "../Modals/AddStudentsDialog";
import { useClassContext } from "../../routes/Class/Context";
import { useParams } from "react-router-dom";
import { updateStudent } from "../../services/students";
import Toaster from "../../utils/Toster";
import ConfirmationModal from "../Modals/ConfirmationModal";

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
          await updateStudent(studentId);
          if (classId) getStudentsByClass(classId);
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
  const [elRef, setElRef] = useState<any | null>(null);
  const [openConfirmation, setOpenConfirmation] = useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentType | null>(
    null
  );
  const handleMenuOpen = (e: React.MouseEvent) => {
    const { currentTarget } = e;
    setElRef(currentTarget);
  };

  const handleDeleteCB = async () => {
    try {
      if (selectedStudent) {
        await handleDelete(selectedStudent.id);
        Toaster("success", `${selectedStudent.email} deleted successfully.`);
        setElRef(null);
        setOpenConfirmation(false)
      }
    } catch (e: any) {
      Toaster("error", e.message);
    }
  };

  const handleConfirmationClose = () => {
    setOpenConfirmation(false);
    setSelectedStudent(null);
    setElRef(null)
  };
  return (
    <StudentsListDetailsContainer>
      <div className={"details"}>
        {studentsData.map((res, index) => {
          return (
            <StudentDetailBox key={index}>
              <Avatar />
              <div className={"student__details"}>
                <div className={"student__name"}>{res.name}</div>
                <div className={"student__email"}>{res.email}</div>
              </div>
              <IconButton color={"inherit"} onClick={handleMenuOpen}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                elevation={1}
                open={!!elRef}
                anchorEl={elRef}
                onClose={() => setElRef(null)}
              >
                <MenuItem>Edit</MenuItem>
                <MenuItem
                  onClick={() => {
                    setSelectedStudent(res);
                    setOpenConfirmation(true);
                  }}
                >
                  Delete
                </MenuItem>
              </Menu>
            </StudentDetailBox>
          );
        })}
      </div>

      <ConfirmationModal
        open={openConfirmation}
        callBackFunction={handleDeleteCB}
        onClose={handleConfirmationClose}
      />

      <Button variant={"contained"} onClick={() => setOpenModal(true)}>
        Add students
      </Button>
    </StudentsListDetailsContainer>
  );
};

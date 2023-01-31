import { FC } from "react";
import { SidebarProps } from "./interfaces";
import { SidebarContainer, LinkList } from "./styled";
import SidebarLink from "./SidebarLink";
import AddIcon from "@mui/icons-material/Add";
import UserInfo from "./UserInfo";
import { Divider } from "@mui/material";
import { ClassInterface } from "services/classes/interfaces";
import { TEST_USER } from "services/users";
import {
  AddCourseButton,
  AddCourseButtonContainer,
} from "./AddCourseButton/styled";

const Sidebar: FC<SidebarProps> = ({ classes, handleOpenModal }) => (
  <SidebarContainer>
    <UserInfo user={TEST_USER} />
    <Divider className="w-75 mb-1" color="#DE4CE1" />
    <h6 className="text-center fw-bold p-0 mt-4 mb-2">Mis cursos</h6>
    <LinkList>
      {classes?.map?.((teacherClass: ClassInterface) => (
        <SidebarLink
          key={teacherClass.id}
          linkId={teacherClass.id}
          linkTitle={teacherClass.alias}
          linkRoute={`cursos/${teacherClass.id}/tablero`}
        />
      ))}
    </LinkList>
    <AddCourseButtonContainer onClick={() => handleOpenModal()}>
      <AddCourseButton color="primary">
        <AddIcon />
      </AddCourseButton>
    </AddCourseButtonContainer>
    {/* <SignOutButton variant="text" color="primary" fullWidth>Cerrar sesión</SignOutButton> */}
  </SidebarContainer>
);

export default Sidebar;

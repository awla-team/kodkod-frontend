import { FC } from "react";
import { SidebarProps } from "./interfaces";
import { SidebarContainer, LinkList } from "./styled";
import SidebarLink from "./SidebarLink";
import AddIcon from "@mui/icons-material/Add";
import UserInfo from "./UserInfo";
import { Divider } from "@mui/material";
import { ClassInterface } from "services/classes/interfaces";
import { AddCourseButton } from "./AddCourseButton/styled";
import HomeIcon from '@mui/icons-material/Home';
import { Link as RouterLink } from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext";

const Sidebar: FC<SidebarProps> = ({ classes, handleOpenModal }) => {
    const {user}= useAuth()
  return (
    <SidebarContainer>
      <UserInfo user={user} />
      <Divider className="w-75 mb-1" color="#DE4CE1" />
      <span className="text-center fw-bold p-0 mt-4 mb-3">Cursos</span>
      <RouterLink to={"/"}>
        <AddCourseButton color="primary">
          <HomeIcon />
        </AddCourseButton>
      </RouterLink>
      <LinkList>
        {classes?.map?.((teacherClass: ClassInterface, index) => (
          <SidebarLink
            key={`side-bar-${teacherClass.id}-${index}`}
            linkId={teacherClass.id}
            linkTitle={teacherClass.alias}
            linkRoute={`cursos/${teacherClass.id}/tablero`}
          />
        ))}
      </LinkList>      
      <AddCourseButton color="info" onClick={() => handleOpenModal()}>
        <AddIcon />
      </AddCourseButton>
    </SidebarContainer>
  );
};

export default Sidebar;

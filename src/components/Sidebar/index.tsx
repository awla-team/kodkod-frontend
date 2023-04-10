import { FC } from "react";
import { SidebarProps } from "./interfaces";
import logo from "assets/images/logo.png";
import { SidebarContainer, LinkList, LogoContainer } from "./styled";
import SidebarLink from "./SidebarLink";
import AddIcon from "@mui/icons-material/Add";
import UserInfo from "./UserInfo";
import { Divider } from "@mui/material";
import { ClassInterface } from "services/classes/interfaces";
import { RoundButton } from "./RoundButton/styled";
import HomeIcon from "@mui/icons-material/Home";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Sidebar: FC<SidebarProps> = ({ classes, handleOpenModal }) => {
  const { user } = useAuth();
  return (
    <SidebarContainer>
      <LogoContainer>
        <img src={logo} />
      </LogoContainer>
      <Divider className="w-75 my-4" color="gray" />
      <span className="text-center fw-bold p-0 mb-3">Cursos</span>
      <RouterLink to={"/app"}>
        <RoundButton color="primary" className="home-button">
          <HomeIcon />
        </RoundButton>
      </RouterLink>
      {classes.length ? (
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
      ) : null}
      <RoundButton
        sx={{ marginBottom: "74px" }}
        color="info"
        onClick={() => handleOpenModal()}
      >
        <AddIcon />
      </RoundButton>
      <UserInfo user={user} />
    </SidebarContainer>
  );
};

export default Sidebar;

import { Route } from "./interfaces";
import { SidebarContainer, LinkList } from "./styled";
import SidebarLink from "./SidebarLink";
import avatar from "./../../assets/images/avatar.png";
import { User } from "./UserInfo/interfaces";
import {
  AddCourseButton,
  AddCourseButtonContainer,
} from "./AddCourseButton/styled";
import AddIcon from "@mui/icons-material/Add";
import UserInfo from "./UserInfo";
import { Divider } from "@mui/material";

const routes: Route[] = [
  {
    title: "7° B",
    img: "",
    path: "/7b",
  },
  {
    title: "8° Med",
    img: "",
    path: "/aventuras",
  },
  {
    title: "2° Medio",
    img: "",
    path: "/7aaa",
  },
  {
    title: "3° Medio",
    img: "",
    path: "/7c",
  },
  {
    title: "4° Medio",
    img: "",
    path: "/7v",
  },
  {
    title: "5° Z",
    img: "",
    path: "/7n",
  },
  {
    title: "5° j",
    img: "",
    path: "/7m",
  },
  {
    title: "5° ñ",
    img: "",
    path: "/7i",
  },
];

const user: User = {
  id: 1,
  avatar,
  first_name: "Juan",
  last_name: "Pérez",
  role: "Profesor",
};

const Sidebar = () => (
  <SidebarContainer>
    <UserInfo user={user} />
    <Divider className="w-75 mb-1" color="#DE4CE1" />
    <h6 className="text-center fw-bold p-0 mt-4 mb-2">Tus cursos</h6>
    <LinkList>
      {routes.map((route) => (
        <SidebarLink key={route.title} route={route} />
      ))}
    </LinkList>
    <AddCourseButtonContainer>
      <AddCourseButton color="secondary">
        <AddIcon />
      </AddCourseButton>
    </AddCourseButtonContainer>
    {/* <SignOutButton variant="text" color="primary" fullWidth>Cerrar sesión</SignOutButton> */}
  </SidebarContainer>
);

export default Sidebar;

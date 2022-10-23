import { Route } from "./interfaces";
import { Link } from "react-router-dom";
import { SidebarContainer, LogoContainer, LinkList } from "./styled";
import logo from "./../../assets/images/logo.png";
import home from "./../../assets/images/home.png";
import adventures from "./../../assets/images/adventures.png";
import ranking from "./../../assets/images/ranking.png";
import SidebarLink from "./SidebarLink";
import UserInfo from "./UserInfo";
import avatar from "./../../assets/images/avatar.png";
import { User } from "./UserInfo/interfaces";
import {
  AddCourseButton,
  AddCourseButtonContainer,
} from "./AddCourseButton/styled";
import AddIcon from "@mui/icons-material/Add";

const routes: Route[] = [
  {
    title: "7° B",
    img: "",
    path: "/",
  },
  {
    title: "8° A",
    img: "",
    path: "/aventuras",
  },
  {
    title: "2° Medio",
    img: "",
    path: "/7b",
  },
  {
    title: "3° Medio",
    img: "",
    path: "/7b",
  },
  {
    title: "4° Medio",
    img: "",
    path: "/7b",
  },
  {
    title: "5° Medio",
    img: "",
    path: "/7b",
  },
  {
    title: "6° Medio",
    img: "",
    path: "/7b",
  },
  {
    title: "7° Medio",
    img: "",
    path: "/7b",
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
    {/* <LogoContainer>
      <Link to="/">
        <img className="w-100" src={logo} alt="kodkod logo" />
      </Link>
    </LogoContainer> */}
    <h6 className="text-center fw-bold p-0 mt-4 mb-2">Cursos</h6>
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
  </SidebarContainer>
);

export default Sidebar;

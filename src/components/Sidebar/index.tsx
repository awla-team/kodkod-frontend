import React from 'react';
import { Route, SidebarLinkProps } from './interfaces';
import { Link, useLocation } from "react-router-dom";
import { SidebarLinkContainer, SidebarContainer, LogoContainer, LinkList } from './styled';
import logo from './../../assets/images/logo.png';
import home from './../../assets/images/home.png';
import adventures from './../../assets/images/adventures.png';
import ranking from './../../assets/images/ranking.png';



const routes: Route[] = [
  {
    title: 'Inicio',
    img: home,
    path: '/',
  },
  {
    title: 'Aventuras',
    img: adventures,
    path: '/aventuras',
  },
  {
    title: 'Clasificación',
    img: ranking,
    path: '/clasificacion',
  },
];

const SidebarLink: React.FC<SidebarLinkProps> = ({ route }) => {
  const location = useLocation();
  return (
      <SidebarLinkContainer className={location.pathname === route.path ? 'active' : ''}>
        <Link to={route.path} className="d-flex flex-column align-items-center justify-content-center">
          <img src={route.img} alt={route.title} />
          <span>{route.title}</span>
        </Link>
      </SidebarLinkContainer>
  );
};

const Sidebar = () => (
  <SidebarContainer>
    <LogoContainer>
      <Link to="/">
        <img className="w-100" src={logo} alt="kodkod logo" />
      </Link>
    </LogoContainer>
    <LinkList>
      {routes.map((route) => <SidebarLink key={route.title} route={route} />)}
    </LinkList>
  </SidebarContainer>
);

export default Sidebar;

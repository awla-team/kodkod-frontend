import { FC } from 'react';
import { SidebarProps } from './interfaces';
import logo from 'assets/images/logo.png';
import { SidebarContainer, LinkList, LogoContainer } from './styled';
import SidebarLink from './SidebarLink';
import AddIcon from '@mui/icons-material/Add';
import UserInfo from './UserInfo';
import { Button, Divider } from '@mui/material';
import { IClass } from 'global/interfaces';
import { RoundButton } from './RoundButton/styled';
import HomeIcon from '@mui/icons-material/Home';
import { Link, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar: FC<SidebarProps> = ({ classes, handleOpenModal }) => {
  const { user } = useAuth();

  return (
    <SidebarContainer className="justify-content-between">
      <div
        className="d-flex flex-column align-items-center"
        id="home-onboarding-5"
      >
        <LogoContainer>
          <img src={logo} />
        </LogoContainer>
        <Divider className="w-75 my-4" color="gray" />
        <span className="text-center fw-bold p-0 mb-3">Cursos</span>
        <RouterLink to={'/app'}>
          <RoundButton color="primary" className="home-button">
            <HomeIcon />
          </RoundButton>
        </RouterLink>
        {classes.length ? (
          <LinkList>
            {classes?.map?.((teacherClass: IClass, index) => (
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
          id="home-onboarding-2"
          sx={{ marginBottom: '74px' }}
          color="info"
          onClick={() => {
            handleOpenModal();
          }}
        >
          <AddIcon />
        </RoundButton>
      </div>
      <div>
        {!user?.is_subscription_active && !user?.is_superuser ? (
          <Button
            className="text-center px-0"
            component={Link}
            to="/app/perfil/suscripciones"
            sx={{ '&:hover': { color: '#fff' }, fontSize: '12px' }}
            variant="contained"
            size="small"
          >
            ¡Hazte Pro!
          </Button>
        ) : null}
        <UserInfo user={user} />
      </div>
    </SidebarContainer>
  );
};

export default Sidebar;

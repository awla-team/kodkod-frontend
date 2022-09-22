import React, { useState, Fragment } from 'react';
import { User, UserInfoProps } from './interfaces';
import { Menu, MenuItem, Avatar } from '@mui/material';
import { HeaderContainer, UserInfoButton } from './styled';
import avatar from './../../assets/images/avatar.png';

const user: User = {
  id: 1,
  avatar,
  first_name: 'Juan',
  last_name: 'Pérez',
  role: 'Profesor',
};

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleClick = (event: React.SyntheticEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);  

  return (
    <Fragment>
      {user.id ? (
        <Fragment>
          <UserInfoButton className="d-flex align-items-center" onClick={handleClick}>
            <img src={user.avatar} alt="avatar" />
            <div className="d-flex flex-column justify-content-center">
              <span>{user.role}</span>
              <span>{`${user.first_name} ${user.last_name}`}</span>
            </div>
          </UserInfoButton>
          <Menu
            anchorEl={anchorEl}
            id="user-menu"
            open={!!anchorEl}
            onClose={handleClose}
            onClick={handleClose}            
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem divider>
              <Avatar src={user.avatar} /> Mi perfil
            </MenuItem>
            <MenuItem>
              Configuración
            </MenuItem>
            <MenuItem>
              Cerrar sesión
            </MenuItem>
          </Menu>
        </Fragment>
      ) : null}
    </Fragment>
  );
};

const Header: React.FC = () => (
  <HeaderContainer className="d-flex justify-content-end align-items-center">    
    <UserInfo user={user} />
  </HeaderContainer>
);

export default Header;

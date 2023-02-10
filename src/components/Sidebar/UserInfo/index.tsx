import { Avatar, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { UserInfoProps } from "./interfaces";
import { UserInfoButton } from "./styled";

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.SyntheticEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  return user.id ? (
    <>
      <UserInfoButton
        className="d-flex w-100 flex-column align-items-center"
        onClick={handleClick}
      >
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
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{ left: 100 }}
      >
        <MenuItem divider>
          <Avatar src={user.avatar} /> Mi perfil
        </MenuItem>
        <MenuItem>Configuración</MenuItem>
        <MenuItem>Cerrar sesión</MenuItem>
      </Menu>
    </>
  ) : null;
};

export default UserInfo;

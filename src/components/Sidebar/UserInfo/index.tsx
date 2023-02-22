import {Avatar, Menu, MenuItem, Tooltip, Typography} from "@mui/material";
import { useState } from "react";
import { UserInfoProps } from "./interfaces";
import { UserInfoButton, UserInfoContainer } from "./styled";
import ImgAvatar from "assets/images/avatar.png";

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.SyntheticEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  return user.id ? (
    <UserInfoContainer>
      <UserInfoButton
        role="button"
        tabIndex={0}
        className="d-flex w-100 flex-column align-items-center mb-2"
        onClick={handleClick}
      >
        <img src={ImgAvatar} alt="avatar" />        
      </UserInfoButton>
      <div className="d-flex flex-column justify-content-center mb-4">
          <span>{`${user?.first_name}`}</span>
          <span>{`${user?.last_name}`}</span>          
      </div>
      <Menu
        anchorEl={anchorEl}
        id="user-menu"
        open={!!anchorEl}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{ left: 64, top: 0, }}
      >
        <MenuItem divider>
          <Avatar src={ImgAvatar} /> <Typography sx={{ml:1}}>Mi Perfil</Typography>
        </MenuItem>
        <MenuItem>Configuración</MenuItem>
        <MenuItem>Cerrar sesión</MenuItem>
      </Menu>
    </UserInfoContainer>
  ) : null;
};

export default UserInfo;

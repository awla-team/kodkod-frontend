import {Avatar, Menu, MenuItem, Tooltip, Typography} from "@mui/material";
import { useState } from "react";
import { UserInfoProps } from "./interfaces";
import { UserInfoButton } from "./styled";
import ImgAvatar from "assets/images/avatar.png";

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
        <img src={ImgAvatar} alt="avatar" />
        <div className="d-flex flex-column justify-content-center">
          <span>{user.role}</span>
          <Tooltip title={`${user?.first_name} ${user?.last_name}`} arrow>
            <span
              className={"display-name-container"}
            >{`${user?.first_name} ${user?.last_name}`}</span>
          </Tooltip>
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
          <Avatar src={ImgAvatar} /> <Typography sx={{ml:1}}>{`${user?.first_name} ${user?.last_name}`}</Typography>
        </MenuItem>
        <MenuItem>Configuración</MenuItem>
        <MenuItem>Cerrar sesión</MenuItem>
      </Menu>
    </>
  ) : null;
};

export default UserInfo;

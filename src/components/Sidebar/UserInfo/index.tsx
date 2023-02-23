import {Avatar, Divider, Menu, MenuItem, Tooltip, Typography} from "@mui/material";
import { useState } from "react";
import { UserInfoProps } from "./interfaces";
import { UserInfoButton, UserInfoContainer } from "./styled";
import ImgAvatar from "assets/images/avatar.png";
import ExpandMore from '@mui/icons-material/ExpandMore';

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.SyntheticEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  return user.id ? (
    <UserInfoContainer className="w-100">
      <Divider className="w-75 my-3" color="gray" />
      <UserInfoButton
        role="button"
        tabIndex={0}
        className="d-flex justify-content-center align-items-center"
        onClick={handleClick}
      >
        <img src={ImgAvatar} alt="avatar" />        
        <ExpandMore fontSize="small"/>
      </UserInfoButton>
      <Menu
        anchorEl={anchorEl}
        id="user-menu"
        open={!!anchorEl}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{ left: 36, top: -16, }}
      >
        <MenuItem divider>
          <Avatar src={ImgAvatar} /> <Typography sx={{ml:1}}>{`${user.first_name} ${user.last_name}`}</Typography>
        </MenuItem>
        <MenuItem>Configuración</MenuItem>
        <MenuItem>Cerrar sesión</MenuItem>
      </Menu>
    </UserInfoContainer>
  ) : null;
};

export default UserInfo;

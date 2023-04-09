import {
  Avatar,
  Divider,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { UserInfoProps } from "./interfaces";
import { UserInfoButton, UserInfoContainer } from "./styled";
import ImgAvatar from "assets/images/avatar.png";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { logout } from "services/auth";
import Toaster from "utils/Toster";
import { useNavigate } from "react-router-dom";

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleClick = (event: React.SyntheticEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const handleLogout = async () => {
    try {
      setLoading(true);
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        await logout({ refreshToken });
        localStorage.clear();
        navigate("/signin");
      }
    } catch (error: any) {
      Toaster("error", error.message);
    } finally {
      setLoading(false);
    }
  };

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
        <ExpandMore fontSize="small" />
      </UserInfoButton>
      <Menu
        anchorEl={anchorEl}
        id="user-menu"
        open={!!anchorEl}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{ left: 36, top: -16 }}
      >
        <MenuItem divider disabled={loading}>
          <Avatar src={ImgAvatar} />{" "}
          <Typography
            sx={{ ml: 1 }}
          >{`${user.first_name} ${user.last_name}`}</Typography>
        </MenuItem>
        {/* <MenuItem disabled={loading}>Configuración</MenuItem> */}
        <MenuItem onClick={handleLogout} disabled={loading}>
          Cerrar sesión
        </MenuItem>
      </Menu>
    </UserInfoContainer>
  ) : null;
};

export default UserInfo;

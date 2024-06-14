import {
  Avatar,
  Chip,
  Divider,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { type UserInfoProps } from './interfaces';
import { UserInfoButton, UserInfoContainer } from './styled';
import ImgAvatar from 'assets/images/avatar.png';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';
import StarIcon from '@mui/icons-material/Star';

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [loading] = useState<boolean>(false);
  const { logout } = useAuth();

  const handleClick = (event: React.SyntheticEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const handleLogout = async () => {
    logout();
  };

  // FIXME: fix this ts error
  // @ts-expect-error ts-error(18047)
  return user.id ? (
    <UserInfoContainer>
      <UserInfoButton
        role='button'
        tabIndex={0}
        className='tw-flex tw-justify-center tw-items-center'
        onClick={handleClick}
      >
        <img src={ImgAvatar} alt='avatar' />
        <ExpandMore fontSize='small' />
      </UserInfoButton>
      <Menu
        anchorEl={anchorEl}
        id='user-menu'
        open={!!anchorEl}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        sx={{ right: 36, top: 16 }}
      >
        <MenuItem divider disabled={loading}>
          <Avatar src={ImgAvatar} />{' '}
          <Typography sx={{ ml: 1 }}>{
            // FIXME: fix this ts error
            // @ts-expect-error ts-error(18047)
            `${user.first_name} ${user.last_name}`
          }</Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout} disabled={loading}>
          Cerrar sesión
        </MenuItem>
      </Menu>
    </UserInfoContainer>
  ) : null;
};

export default UserInfo;

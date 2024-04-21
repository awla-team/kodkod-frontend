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
    <UserInfoContainer className='w-100'>
      <Divider className='w-75 my-3' color='gray' />
      <UserInfoButton
        role='button'
        tabIndex={0}
        className='d-flex justify-content-center align-items-center'
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
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{ left: 36, top: -16 }}
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

import { MouseEventHandler } from 'react';
import {
  DrawerProps as MuiDrawerProps,
  Drawer as MuiDrawer,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Drawer = ({ children, onClose, ...props }: MuiDrawerProps) => {
  return (
    <MuiDrawer
      anchor="right"
      variant="temporary"
      onClose={onClose}
      sx={{ overflow: 'hidden' }}
      {...props}
    >
      <IconButton
        onClick={onClose as MouseEventHandler<HTMLButtonElement>}
        sx={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          backgroundColor: 'white',
        }}
      >
        <CloseIcon />
      </IconButton>
      <div className="p-5">{children}</div>
    </MuiDrawer>
  );
};

export default Drawer;

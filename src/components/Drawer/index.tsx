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
      PaperProps={{ className: 'p-5' }}
      onClose={onClose}
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
      {children}
    </MuiDrawer>
  );
};

export default Drawer;

import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {      
      main: '#53a8b6',
      dark: '#000072',
      light: '#E4F9FF',
      contrastText: '#fff',
    },
    secondary: {
      main: '#DE4CE1'
    },
    info: {
      main: '#fff',
    }
  },
  typography: {    
    fontFamily: [
      'Quicksand',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '24px',          
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          '&.MuiChip-colorInfo': {
            border: '1px solid lightgray',
          },
        },
      },
    },
  },
}); 

export default theme;
import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {      
      main: '#3AB4F2',
      contrastText: '#fff',
    },
    secondary: {
      main: '#326eb3'
    }
  },
  typography: {
    fontFamily: [
      'Montserrat',
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
        }
      }
    }
  }
}); 

export default theme;
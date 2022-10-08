import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {      
      main: '#53a8b6',
      dark: '#000072',
      contrastText: '#fff',
    },
    secondary: {
      main: '#326eb3'
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
        }
      }
    }
  }
}); 

export default theme;
import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#5D7CFB",
      dark: "#3D5EE1",
      light: "#9FB2FF",
      contrastText: "#fff",
    },
    secondary: {
      main: "#FDC51A",
      dark: "#E3AB00",
      light: "#FFD040",
    },
    info: {
      main: "#EAEDFE",
      dark: "#d8d8f4",
      light: "#e9e9f9",
      contrastText: "#5D7CFB",
    },
  },
  typography: {
    fontFamily: [
      "Quicksand",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "24px",
        },
      },
    },    
    MuiChip: {
      styleOverrides: {
        root: {
          "&.MuiChip-colorInfo": {
            border: "1px solid lightgray",
          },
        },
      },
    },    
  },
});

export default theme;

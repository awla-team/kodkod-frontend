import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { router } from 'routes/router';
import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import theme from 'global/theme';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import { TourProvider } from '@reactour/tour';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MuiThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        <TourProvider steps={[]} onClickMask={() => {}}>
          <ToastContainer />
          <RouterProvider router={router} />
        </TourProvider>
      </StyledThemeProvider>
    </MuiThemeProvider>
  </React.StrictMode>
);

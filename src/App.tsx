import React from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import theme from './global/theme';
import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

const App: React.FC = () => {
  return (    
    <MuiThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        <div className="app-container d-flex">
          <Sidebar />
          <div className="app-main-container d-flex flex-column flex-fill">
            <Header />
            <div className="app-content container">
              <div className="app-background-container">
                {/*<BackgroundBlue className="bg-left" />
                <BackgroundPink className="bg-right" />*/}
              </div>
              <Outlet />
              {/*<Routes>
                <Route index element={<Home />} />
                <Route path="misiones">
                  <Route index element={<Missions />} />
                  <Route path=":id" element={<EditMission />} />
                  <Route path="nueva-mision" element={<AddMission />} />
                </Route>
                <Route path="clasificacion" element={<Badges />} />
              </Routes>*/}
            </div>
          </div>      
        </div>      
      </StyledThemeProvider>
    </MuiThemeProvider>    
  );
};

export default App;
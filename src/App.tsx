import React from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { CustomTheme } from './global.interfaces';
import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

const theme: CustomTheme = {
  titleColor: '#000072',
  highlightColor: '#68bbd4',
  textColor: '#000',
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
};

export default App;

import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { NavTabsContainer } from "./styled";
import { useClassContext } from "./context";
import DashboardIcon from '@mui/icons-material/DashboardTwoTone';
import AdventuresIcon from '@mui/icons-material/RocketLaunchTwoTone';
import ProgressIcon from '@mui/icons-material/LeaderboardTwoTone';
import ReportsIcon from '@mui/icons-material/PieChartTwoTone';

const tabs = [
  {    
    title: 'Tablero',
    path: 'tablero',
    svg: <DashboardIcon />
  },
  {    
    title: 'Aventuras',
    path: 'aventuras',
    svg: <AdventuresIcon />
  },
  {    
    title: 'Progreso',
    path: 'progreso',
    svg: <ProgressIcon />
  },
  {    
    title: 'Reportes',
    path: 'reportes',
    svg: <ReportsIcon />
  },
];

const Class: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();  
  const { classDetails, students } = useClassContext();

  return (
    <>
      <NavTabsContainer>
        {tabs.map((tab, i) => (
          <Box key={`tab-${i}`} className={`nav__tab ${pathname.includes(tab.path) ? "active" : ""}`} role="button" onClick={() => navigate(tab.path)}>
            {tab.svg}
            <Typography fontWeight="bold" component="span" variant="body2">{tab.title}</Typography>
          </Box>
        ))}        
      </NavTabsContainer>
      <Box
        role="tabpanel"
        className="w-100 overflow-auto"
        sx={{ marginTop: 'calc(64px + 36px)', paddingBottom: '36px' }}        
      >
        <Outlet context={{ classDetails, students }} />
      </Box>
    </>
  );
};

export default Class;

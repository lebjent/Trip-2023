import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './layout/Header';
import SideBar from './layout/SideBar';
import { Route, Routes } from 'react-router-dom';
import MainBoard from '../menu/MainBoard';
import LoactionManage from '../menu/locationManage/LoactionManage';
import AirLineManage from '../menu/airLineManage/AirLineManage';
import AirPlaneManage from '../menu/airPlaneManage/AirPlaneManage';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));
export default function DashBoard() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header handleDrawerOpen={handleDrawerOpen} open={open} />
      <SideBar handleDrawerClose={handleDrawerClose} open={open} theme={theme}/>
      <Main open={open}>
        <DrawerHeader />
        <Routes>
          <Route exact path="/" element={<MainBoard />} />
          <Route exact path="/locationManage" element={<LoactionManage />} />
          <Route exact path="/airLineManage" element={<AirLineManage />} />
          <Route exact path="/airPlaneManage" element={<AirPlaneManage />} />
        </Routes>  
      </Main>
    </Box>
  );
}

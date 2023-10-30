import React from 'react'
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Airplane from '@mui/icons-material/AirplanemodeActiveOutlined';
import Hotel from '@mui/icons-material/Bed';
import Reservation from '@mui/icons-material/DateRangeOutlined';
import ProductManage from '@mui/icons-material/ManageSearch';
import Cancel from '@mui/icons-material/EventBusyOutlined';
import Review from '@mui/icons-material/PhotoCamera';
import { Drawer, List } from '@mui/material';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

const drawerWidth = 240;

function SideBar({handleDrawerClose,open,theme}) {
  return (
    <Drawer
        sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
        },
        }}
        variant="persistent"
        anchor="left"
        open={open}
    >
        <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
            <ListItem  disablePadding>
            <ListItemButton>
                <ListItemIcon>
                    <Reservation />
                </ListItemIcon>
                <ListItemText primary={'예약현황'} />
            </ListItemButton>
            </ListItem>
            <ListItem  disablePadding>
            <ListItemButton>
                <ListItemIcon>
                    <Cancel />
                </ListItemIcon>
                <ListItemText primary={'예약취소현황'} />
            </ListItemButton>
            </ListItem>
            <ListItem  disablePadding>
            <ListItemButton>
                <ListItemIcon>
                    <ProductManage />
                </ListItemIcon>
                <ListItemText primary={'여행상품관리'} />
            </ListItemButton>
            </ListItem>
            <ListItem  disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <Hotel />
                    </ListItemIcon>
                    <ListItemText primary={'호텔관리'} />
                </ListItemButton>
            </ListItem>
            <ListItem  disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <Airplane />
                    </ListItemIcon>
                    <ListItemText primary={'항공관리'} />
                </ListItemButton>
            </ListItem>       
            <ListItem  disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <Review />
                    </ListItemIcon>
                    <ListItemText primary={'여행후기관리'} />
                </ListItemButton>
            </ListItem> 
        </List>
        <Divider />
    </Drawer>
  )
}

export default SideBar
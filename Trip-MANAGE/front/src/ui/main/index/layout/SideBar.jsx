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
import Place from '@mui/icons-material/Place';
import { Drawer, List } from '@mui/material';
import { Link } from 'react-router-dom';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

// 스타일드 컴포넌트를 생성하여 Link 컴포넌트를 스타일링
const StyledLink = styled(Link)`
  text-decoration: none; /* 밑줄 제거 스타일 */
  color: black;
  font-weight: bold;
  /* 다른 원하는 스타일을 추가할 수 있습니다. */
`;  

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
            <StyledLink to={'/dashboard/locationManage'}>
                <ListItem  disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Place />
                        </ListItemIcon>
                        <ListItemText primary={'여행지관리'} />
                    </ListItemButton>
                </ListItem>    
            </StyledLink>
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
import React, { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import DashboardSidebar from './partials/DashboardSidebar';
import { loginUrl } from '@/configs/constants';
import { userLoggedOut } from '@/redux-rtk/features/auth/authSlice';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/hooks/helpers';
import DashboardHeader from './partials/DashboardHeader';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
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
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

type Props = {
    children: React.ReactNode
}

export default function DashboardLayout({ children }: Props) {

    // hooks
    const theme = useTheme();

    // globals
    const router = useRouter();
    const dispatch = useAppDispatch();
    const auth = useAppSelector((state) => state.auth);

    // states
    const [open, setOpen] = useState(true);

    // handlers
    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);

    // if profile api failed to fetch
    useEffect(() => {
        if (!auth.isAuthenticated) {
            dispatch(userLoggedOut());
            router.push(loginUrl);
        }
    }, [auth.isAuthenticated, dispatch, router])

    // loading
    if (!auth.isAuthenticated) return null;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            <DashboardHeader
                open={open}
                AppBar={AppBar}
                handleDrawerOpen={handleDrawerOpen}
            />

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
                        {theme.direction === 'ltr' ? <BsChevronLeft /> : <BsChevronRight />}
                    </IconButton>
                </DrawerHeader>
                <Divider />

                <DashboardSidebar />

            </Drawer>

            <Main open={open}>
                <DrawerHeader />
                {children}
            </Main>

        </Box>
    );
}
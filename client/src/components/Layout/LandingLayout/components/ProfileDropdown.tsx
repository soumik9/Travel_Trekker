import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material'
import React from 'react'
import { settings } from '../utils/LandingConstants'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/hooks/helpers';
import { dashboardLink, loginUrl, profileLink } from '@/configs/constants';
import { userLoggedOut } from '@/redux-rtk/features/auth/authSlice';
import toast from 'react-hot-toast';

type Props = {
    handleOpenUserMenu: any;
    anchorElUser: any;
    handleCloseUserMenu: any;
}

const ProfileDropdown = ({ handleOpenUserMenu, anchorElUser, handleCloseUserMenu, }: Props) => {

    // global
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(userLoggedOut());
        toast.success('Logout Success!')
    }

    return (
        <Box sx={{ flexGrow: 0 }} className='mx-4'>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                <Link href={dashboardLink}>
                    <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">Dashboard</Typography>
                    </MenuItem>
                </Link>

                <Link href={profileLink}>
                    <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">Profile</Typography>
                    </MenuItem>
                </Link>

                <button type='button' onClick={handleLogout}>
                    <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                </button>
            </Menu>
        </Box>
    )
}

export default ProfileDropdown
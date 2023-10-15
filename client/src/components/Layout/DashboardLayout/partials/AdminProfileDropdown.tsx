import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material'
import React from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/helpers';
import Link from 'next/link';
import { loginUrl } from '@/configs/constants';
import { useRouter } from 'next/router';
import { userLoggedOut } from '@/redux-rtk/features/auth/authSlice';
import toast from 'react-hot-toast';

type Props = {
    handleOpenUserMenu: any;
    anchorElUser: any;
    handleCloseUserMenu: any;
}

const AdminProfileDropdown = ({ handleOpenUserMenu, anchorElUser, handleCloseUserMenu, }: Props) => {

    // global
    const router = useRouter();
    const dispatch = useAppDispatch();
    const auth = useAppSelector((state) => state.auth);

    const handleLogout = () => {
        router.push(loginUrl);
        dispatch(userLoggedOut());
        toast.success('Logout Success!')
    }

    return (
        <Box sx={{ flexGrow: 0 }} className='mx-4'>

            <div className='flex items-center gap-2'>
                <p className='cursor-default'>{auth.user?.name}</p>

                <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt={auth.user?.name} src={auth?.user?.image} />
                    </IconButton>
                </Tooltip>
            </div>

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

                <Link href='/profile'>
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

export default AdminProfileDropdown
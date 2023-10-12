import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material'
import React from 'react'
import { settings } from '../utils/LandingConstants'

type Props = {
    handleOpenUserMenu: any;
    anchorElUser: any;
    handleCloseUserMenu: any;
}

const ProfileDropdown = ({ handleOpenUserMenu, anchorElUser, handleCloseUserMenu, }: Props) => {
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
                {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    )
}

export default ProfileDropdown
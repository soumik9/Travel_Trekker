import { IconButton, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai';
import AdminProfileDropdown from './AdminProfileDropdown';

type Props = {
    open: boolean;
    AppBar: any;
    handleDrawerOpen: any;
}

const DashboardHeader = ({ open, handleDrawerOpen, AppBar }: Props) => {

    // states
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorElUser(event.currentTarget);
    const handleCloseUserMenu = () => setAnchorElUser(null);

    return (
        <AppBar position="fixed" open={open} className='!bg-smartian'>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{ mr: 2, ...(open && { display: 'none' }) }}
                >
                    <AiOutlineMenu />
                </IconButton>

                <div className='flex justify-end w-full'>
                    <AdminProfileDropdown
                        anchorElUser={anchorElUser}
                        handleOpenUserMenu={handleOpenUserMenu}
                        handleCloseUserMenu={handleCloseUserMenu}
                    />
                </div>

            </Toolbar>
        </AppBar>
    )
}

export default DashboardHeader
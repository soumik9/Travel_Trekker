import { Box, Divider, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import Image from 'next/image';
import React from 'react'
import { navItems } from '../utils/LandingConstants';
import Drawer from '@mui/material/Drawer';
import Link from 'next/link';

const drawerWidth = 240;

type Props = {
    mobileOpen: any;
    handleDrawerToggle: any;
    window?: () => Window;
}

const MobileDrawer = ({ handleDrawerToggle, mobileOpen, ...props }: Props) => {

    const { window } = props;

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <div className='flex items-center justify-center text-[20px]'>
                <Image src='/sm-logo.png' width={60} height={60} alt='small logo' />
                <i>T</i>ravel &nbsp;<i>T</i>rekker
            </div>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.title} disablePadding>
                        <Link href={item.url}>
                            <ListItemButton sx={{ textAlign: 'center' }}>
                                <ListItemText primary={item.title} />
                            </ListItemButton>
                        </Link>

                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <nav>
            <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                {drawer}
            </Drawer>
        </nav>
    )
}

export default MobileDrawer
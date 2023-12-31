import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { AiOutlineMenu } from 'react-icons/ai'
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ProfileDropdown from '../components/ProfileDropdown';
import { navItems } from '../utils/LandingConstants';
import MobileDrawer from '../components/MobileDrawer';
import { useAppSelector } from '@/hooks/helpers';
import { homeLink } from '@/configs/constants';


export default function Header() {

    const auth = useAppSelector((state) => state.auth);

    // states
    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    // handlers
    const handleDrawerToggle = () => setMobileOpen((prevState) => !prevState);
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorElUser(event.currentTarget);
    const handleCloseUserMenu = () => setAnchorElUser(null);

    return (
        <Box sx={{ display: 'flex' }} >
            <CssBaseline />
            <div className='h-14 md:h-16'></div>

            <AppBar component="nav" className='!bg-lightDark container'>
                <Toolbar className='flex justify-between'>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <AiOutlineMenu />
                    </IconButton>


                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}

                    >
                        <Link href={homeLink} className='md:!flex items-center text-secondary'>
                            <Image src='/sm-logo.png' width={60} height={60} alt='small logo' />
                            <i>T</i>ravel &nbsp;<i>T</i>rekker
                        </Link>
                    </Typography>


                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {navItems
                            .filter((item) => item.auth !== auth.isAuthenticated)
                            .map((item) => (
                                <Button key={item.title} sx={{ color: '#fff' }}>
                                    <Link href={item.url}>{item.title}</Link>
                                </Button>
                            ))}
                    </Box>

                    {/* dropdown */}
                    {auth.isAuthenticated ? <ProfileDropdown
                        anchorElUser={anchorElUser}
                        handleOpenUserMenu={handleOpenUserMenu}
                        handleCloseUserMenu={handleCloseUserMenu}
                    /> : null}

                </Toolbar>
            </AppBar>

            <MobileDrawer
                mobileOpen={mobileOpen}
                handleDrawerToggle={handleDrawerToggle}
            />
        </Box>
    );
}
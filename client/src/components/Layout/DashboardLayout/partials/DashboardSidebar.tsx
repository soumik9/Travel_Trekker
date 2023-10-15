import { ENUM_USER_ROLE } from '@/configs/constants'
import { cx, useAppSelector } from '@/hooks/helpers'
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import { AiOutlineDashboard, AiOutlineUser } from 'react-icons/ai'

type Props = {}

const sidebarItems = [
    {
        text: 'Dashboard',
        url: '/dashboard',
        icon: AiOutlineDashboard,
        roles: [ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER]
    },
    {
        text: 'Orders',
        url: '/orders',
        icon: AiOutlineUser,
        roles: [ENUM_USER_ROLE.USER]
    },
    {
        text: 'Users',
        url: '/users',
        icon: AiOutlineUser,
        roles: [ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN]
    },
]

type IconType = React.ElementType;

const Icon: React.FC<{ icon: IconType; isActive: boolean }> = ({ icon: Icon, isActive }) => {
    return <Icon className={cx(
        isActive ? 'text-white' : 'text-smartian'
    )} />;
}

const DashboardSidebar = (props: Props) => {

    const router = useRouter();

    // redux states
    const auth = useAppSelector((state) => state.auth);

    return (
        <List>
            {sidebarItems.map((item) => {
                if (auth.user?.role && item.roles.includes(auth.user.role)) {
                    return (
                        <ListItem key={item.text} disablePadding>
                            <ListItemButton className={cx(
                                router.route === item.url && '!bg-smartian !text-white'
                            )}>
                                <ListItemIcon>
                                    <Icon icon={item.icon} isActive={router.route === item.url} />
                                </ListItemIcon>
                                <ListItemText primary={item.text} className='!font-medium' />
                            </ListItemButton>
                        </ListItem>
                    );
                }
                return null
            })}
        </List>
    )
}

export default DashboardSidebar
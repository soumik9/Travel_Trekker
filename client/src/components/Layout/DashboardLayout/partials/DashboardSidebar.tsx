import { ENUM_USER_ROLE, addUserLink, dashboardLink, editUserLink, usersLink } from '@/configs/constants'
import { cx, useAppSelector } from '@/hooks/helpers'
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { AiOutlineDashboard, AiOutlineUser } from 'react-icons/ai'

type Props = {}

const sidebarItems = [
    {
        text: 'Dashboard',
        url: dashboardLink,
        icon: AiOutlineDashboard,
        roles: [ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER],
        activeRouter: [dashboardLink]
    },
    {
        text: 'Orders',
        url: '/orders',
        icon: AiOutlineUser,
        roles: [ENUM_USER_ROLE.USER],
        activeRouter: ['/order']
    },
    {
        text: 'Users',
        url: usersLink,
        icon: AiOutlineUser,
        roles: [ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN],
        activeRouter: [usersLink, addUserLink, editUserLink]
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
                            <Link href={item.url} className='w-full'>
                                <ListItemButton className={cx(
                                    item.activeRouter.includes(router.route) && '!bg-smartian !text-white'
                                )}>
                                    <ListItemIcon>
                                        <Icon icon={item.icon} isActive={item.activeRouter.includes(router.route)} />
                                    </ListItemIcon>
                                    <ListItemText primary={item.text} className='!font-medium' />
                                </ListItemButton>
                            </Link>
                        </ListItem>
                    );
                }
                return null
            })}
        </List>
    )
}

export default DashboardSidebar
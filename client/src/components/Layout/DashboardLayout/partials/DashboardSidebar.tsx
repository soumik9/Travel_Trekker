import { ENUM_USER_ROLE, addFAQLink, addNewsLink, addRoomLink, addUserLink, dashboardLink, editFAQLink, editHotelLink, editNewsLink, editRoomLink, editUserLink, faqsLink, hotelsLink, newsLink, orderHistoryLink, ordersLink, roomsLink, usersLink } from '@/configs/constants'
import { cx, useAppSelector } from '@/hooks/helpers'
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { AiOutlineDashboard, AiOutlineUser, AiOutlineBorderHorizontal, AiOutlineQuestionCircle } from 'react-icons/ai'
import { MdOutlineBedroomChild, MdOutlineLocalHotel, MdOutlineNewspaper } from 'react-icons/md'
import { addHotelLink } from '../../../../configs/constants';

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
        url: ordersLink,
        icon: AiOutlineBorderHorizontal,
        roles: [ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN],
        activeRouter: [ordersLink]
    },
    {
        text: 'Order History',
        url: orderHistoryLink,
        icon: AiOutlineBorderHorizontal,
        roles: [ENUM_USER_ROLE.USER],
        activeRouter: [orderHistoryLink]
    },
    {
        text: 'Rooms',
        url: roomsLink,
        icon: MdOutlineBedroomChild,
        roles: [ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN],
        activeRouter: [roomsLink, addRoomLink, editRoomLink]
    },
    {
        text: 'Hotels',
        url: hotelsLink,
        icon: MdOutlineLocalHotel,
        roles: [ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN],
        activeRouter: [hotelsLink, addHotelLink, editHotelLink]
    },
    {
        text: 'Users',
        url: usersLink,
        icon: AiOutlineUser,
        roles: [ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN],
        activeRouter: [usersLink, addUserLink, editUserLink]
    },
    {
        text: 'FAQ',
        url: faqsLink,
        icon: AiOutlineQuestionCircle,
        roles: [ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN],
        activeRouter: [faqsLink, addFAQLink, editFAQLink]
    },
    {
        text: 'News',
        url: newsLink,
        icon: MdOutlineNewspaper,
        roles: [ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN],
        activeRouter: [newsLink, addNewsLink, editNewsLink]
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
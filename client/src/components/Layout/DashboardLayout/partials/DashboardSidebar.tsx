import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import { AiOutlineDashboard, AiOutlineUser } from 'react-icons/ai'

type Props = {}

const sidebarItems = [
    {
        text: 'Dashboard',
        url: '/dashboard',
        icon: <AiOutlineDashboard />
    },
    {
        text: 'Users',
        url: '/users',
        icon: <AiOutlineUser />
    },
]

const DashboardSidebar = (props: Props) => {
    return (
        <List>
            {sidebarItems.map((item, index) => (
                <ListItem key={item.text} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    )
}

export default DashboardSidebar
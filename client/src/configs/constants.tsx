import { selectItemType } from "@/components/Forms/SelectCustom"

export enum ENUM_USER_ROLE {
    ADMIN = 'admin',
    SUPER_ADMIN = 'super_admin',
    USER = 'user'
}

export const linkCls = 'text-purple-600 mt-3 hover:text-purple hover:underline trans'

export const homeLink = '/'
export const loginUrl = '/auth/login'
export const signupUrl = '/auth/signup'

export const dashboardLink = '/dashboard'
export const profileLink = '/profile'

export const usersLink = '/user'
export const addUserLink = '/user/add'
export const editUserLink = '/user/[userId]'

export const roomsLink = '/room'
export const addRoomLink = '/room/add'
export const editRoomLink = '/room/[roomId]'

export const hotelsLink = '/hotel'
export const addHotelLink = '/hotel/add'
export const editHotelLink = '/hotel/[hotelId]'

export const landingPageLayoutUrls = [
    homeLink
]

export const dashboardPageLayoutUrls = [
    dashboardLink, profileLink,
    usersLink, addUserLink, editUserLink,
    roomsLink, addRoomLink, editRoomLink,
    hotelsLink, addHotelLink, editHotelLink,
]

export const rolesOptions: selectItemType[] = [
    { _id: 'roleOp1', label: 'Super Admin', value: ENUM_USER_ROLE.SUPER_ADMIN },
    { _id: 'roleOp2', label: ENUM_USER_ROLE.ADMIN, value: ENUM_USER_ROLE.ADMIN },
    { _id: 'roleOp3', label: ENUM_USER_ROLE.USER, value: ENUM_USER_ROLE.USER },
];
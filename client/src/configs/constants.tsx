import { selectItemType } from "@/components/Forms/SelectCustom"

export enum ENUM_USER_ROLE {
    ADMIN = 'admin',
    SUPER_ADMIN = 'super_admin',
    USER = 'user'
}

export const homeLink = '/'
export const loginUrl = '/auth/login'
export const signupUrl = '/auth/signup'

export const dashboardLink = '/dashboard'

export const usersLink = '/user'
export const addUserLink = '/user/add'
export const editUserLink = '/user/[userId]'

export const landingPageLayoutUrls = [
    homeLink
]

export const dashboardPageLayoutUrls = [
    dashboardLink,
    usersLink, addUserLink, editUserLink,
]

export const rolesOptions: selectItemType[] = [
    { _id: 'roleOp1', label: 'Super Admin', value: ENUM_USER_ROLE.SUPER_ADMIN },
    { _id: 'roleOp2', label: ENUM_USER_ROLE.ADMIN, value: ENUM_USER_ROLE.ADMIN },
    { _id: 'roleOp3', label: ENUM_USER_ROLE.USER, value: ENUM_USER_ROLE.USER },
];
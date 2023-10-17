import { selectItemType } from "@/components/Forms/SelectCustom"
import { AiOutlineBook, AiOutlineHistory, AiOutlineUnorderedList } from "react-icons/ai"
import { GoCodeReview } from "react-icons/go"
import { GiAstronautHelmet } from "react-icons/gi"
import { MdOutlineMarkEmailRead } from "react-icons/md"

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

export const availableService = [
    {
        icon: <AiOutlineUnorderedList />,
        title: 'Hotel Listings',
        desc: 'Search and filter options to find hotels by location, price range, amenities, and more.',
    },
    {
        icon: <AiOutlineBook />,
        title: 'Booking and Reservations',
        desc: 'Room selection and customization options and booking confirmation.',
    },
    {
        icon: <GoCodeReview />,
        title: 'Reviews and Ratings',
        desc: 'Feedback and rating system to help users make informed decisions.',
    },
    {
        icon: <AiOutlineHistory />,
        title: 'Booking History',
        desc: 'View and manage booking history. Access to orders.',
    },
    {
        icon: <GiAstronautHelmet />,
        title: 'Registration and Authentication',
        desc: 'User registration and authentication system to secure user accounts.',
    },
    {
        icon: <MdOutlineMarkEmailRead />,
        title: 'Marketing and Promotions',
        desc: 'Email marketing, referral programs, and social sharing options.',
    },
]
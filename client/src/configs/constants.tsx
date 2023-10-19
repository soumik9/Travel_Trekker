import { selectItemType } from "@/components/Forms/SelectCustom"
import { AiOutlineBook, AiOutlineHistory, AiOutlineMessage, AiOutlineNotification, AiOutlineUnorderedList } from "react-icons/ai"
import { GoCodeReview } from "react-icons/go"
import { GiAstronautHelmet } from "react-icons/gi"
import { MdOutlineMarkEmailRead } from "react-icons/md"
import { TbLocationSearch } from "react-icons/tb"

export enum ENUM_USER_ROLE {
    ADMIN = 'admin',
    SUPER_ADMIN = 'super_admin',
    USER = 'user'
}

export const linkCls = 'text-purple-600 mt-3 hover:text-purple hover:underline trans'

export const homeLink = '/'
export const landingRoomsLink = '/rooms'
export const loginUrl = '/auth/login'
export const signupUrl = '/auth/signup'
export const bookNowUrl = '/book-now/[roomId]'
export const roomsByHotelUrl = '/rooms-by-hotel/[hotelId]'

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

export const faqsLink = '/faq'
export const addFAQLink = '/faq/add'
export const editFAQLink = '/faq/[faqId]'

export const newsLink = '/news'
export const addNewsLink = '/news/add'
export const editNewsLink = '/news/[newsId]'

export const ordersLink = '/order'
export const orderEditLink = '/order/[orderId]'

export const orderHistoryLink = '/order-history'

export const landingPageLayoutUrls = [
    homeLink,
    landingRoomsLink,
    bookNowUrl,
    roomsByHotelUrl,
]

export const dashboardPageLayoutUrls = [
    dashboardLink, profileLink,
    usersLink, addUserLink, editUserLink,
    roomsLink, addRoomLink, editRoomLink,
    hotelsLink, addHotelLink, editHotelLink,
    faqsLink, addFAQLink, editFAQLink,
    newsLink, addNewsLink, editNewsLink,
    orderHistoryLink, ordersLink, orderEditLink
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

export const upcomingServices = [
    {
        icon: <AiOutlineMessage />,
        title: 'Messaging and Support',
        desc: 'In-app messaging or chat support for users to communicate with hotel staff.',
    },
    {
        icon: <TbLocationSearch />,
        title: 'Location-Based Services',
        desc: 'Geo-fencing and location-based recommendations.',
    },
    {
        icon: <AiOutlineNotification />,
        title: 'Notifications',
        desc: 'Real-time notifications for booking confirmations, cancellations, and special offers.',
    },
]

export const hotelOverviews = [
    {
        img: '/overview/1.png',
        title: 'It starts with a booking',
        desc: 'The only way to leave a review is to first make a booking. Thats how we know our reviews come form real guests who have stayed at the property',
    },
    {
        img: '/overview/2.png',
        title: 'Followed by a trip',
        desc: 'The only way to leave a review is to first make a booking. Thats how we know our reviews come form real guests who have stayed at the property',
    },
    {
        img: '/overview/3.png',
        title: 'And finally, a review',
        desc: 'The only way to leave a review is to first make a booking. Thats how we know our reviews come form real guests who have stayed at the property',
    }
]

export const reviewSlidersData = [
    {
        _id: 'reviewsSlider_1',
        img: '/reviews/md-yousuf.jpg',
        name: 'MD Yousuf',
        rating: 5,
        review: 'This was my first time using a web developer and I am beyond satisfied. Not only with the customer service. He made  sure my site was exactly what I wanted. Helped me with every aspect. I will definitely be recommending him to other companies or clients. Thans for such good work.',
        position: 'Operation Manager, Decipher Tech',
    },
    {
        _id: 'reviewsSlider_2',
        img: '/reviews/tamim.jpg',
        name: 'Tamim Hasan',
        rating: 5,
        review: 'Working with him was a pleasure. His expertise and knowledge of POS management helped us to create a highly efficient and effective sale system. He was able to deliver the project on time and within budget. We gladly recommend anyone looking for a professional developer to hire him.',
        position: 'Owner, <br /> Tamim Enterprise',
    },
    {
        _id: 'reviewsSlider_3',
        img: '/reviews/sabit.jpeg',
        name: 'MD SABIT HOSSAIN',
        rating: 5,
        review: 'Their way of work and every cooperation are really appreciating. And thanks to the team for making us a wonderful website for our organization. They find the best out of it. We were pleased with the result and would definitely recommend them',
        position: 'Logistics and Operation Headr, Yangzhou University',
    },
    {
        _id: 'reviewsSlider_4',
        img: '/reviews/sabit.jpeg',
        name: 'MD SABIT HOSSAIN',
        rating: 5,
        review: 'Their way of work and every cooperation are really appreciating. And thanks to the team for making us a wonderful website for our organization. They find the best out of it. We were pleased with the result and would definitely recommend them',
        position: 'Logistics and Operation Headr, Yangzhou University',
    },
    {
        _id: 'reviewsSlider_5',
        img: '/reviews/sabit.jpeg',
        name: 'MD SABIT HOSSAIN',
        rating: 5,
        review: 'Their way of work and every cooperation are really appreciating. And thanks to the team for making us a wonderful website for our organization. They find the best out of it. We were pleased with the result and would definitely recommend them',
        position: 'Logistics and Operation Headr, Yangzhou University',
    },
]


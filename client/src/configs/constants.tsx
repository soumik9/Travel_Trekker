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

export const hotelBookingSurveys = [
    {
        title: "Customer Satisfaction Survey",
        description: "Help us improve our services by providing your feedback. Rate your recent stay with us and share your comments.",
        questions: [
            "How satisfied were you with your stay?",
            "Would you recommend our hotel to others?",
            "What can we do to enhance your experience in the future?",
        ],
    },
    {
        title: "Travel Preferences Survey",
        description: "Tell us about your travel preferences, such as room type, amenities, and additional services you'd like to have during your stay.",
        questions: [
            "What type of room do you prefer when booking a hotel?",
            "Which amenities are important to you during your stay?",
            "Do you usually take advantage of additional services, such as room service or spa treatments?",
        ],
    },
    {
        title: "Destination Experience Survey",
        description: "Share your experiences and recommendations about the destinations you've visited through our hotel booking services.",
        questions: [
            "Tell us about a memorable experience you had during your trip.",
            "Which destination would you recommend to other travelers?",
            "Any tips for travelers visiting a specific location?",
        ],
    },
    {
        title: "Booking Process Feedback Survey",
        description: "Help us streamline the booking process by providing your feedback on our website or app's usability and convenience.",
        questions: [
            "How easy was it to find and book a hotel on our platform?",
            "Did you encounter any issues during the booking process?",
            "Any suggestions for improving our website or app?",
        ],
    },
];


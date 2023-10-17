import { homeLink, loginUrl, signupUrl } from "@/configs/constants";

export const navItems = [
    {
        title: 'Home',
        url: homeLink,
        auth: false
    },
    {
        title: 'Services',
        url: '/services',
        auth: false
    },
    {
        title: 'Login',
        url: loginUrl,
        auth: true
    },
    {
        title: 'Signup',
        url: signupUrl,
        auth: true
    },
];


export const footerTouchItems = [
    {
        title: 'traveltrekker@example.com',
        url: 'mailto:traveltrekker@example.com',
    },
    {
        title: '+8801689201370',
        url: 'tel:+8801689201370',
    }
];

export const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
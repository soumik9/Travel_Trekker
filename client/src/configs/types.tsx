import { ENUM_USER_ROLE } from "./constants";

export interface ILogin {
    email: string;
    password: string;
}

export type IRole = ENUM_USER_ROLE.SUPER_ADMIN | ENUM_USER_ROLE.ADMIN | ENUM_USER_ROLE.USER;

export interface IUser {
    _id?: string;
    name: string;
    image: string;
    email: string;
    password: string;
    role: IRole | undefined;
    services: string[];
    reviews: string[];
    orders: string[];
}

export interface IHotel {
    _id?: string;
    name: string;
    image: string;
    location: string;
    rating: number;
    isAvailable: boolean;
    rooms: string[] | IRoom[];
}

export interface IRoom {
    _id?: string;
    roomNumber: string;
    roomType: string;
    price: number;
    isAvailable: boolean;
    hotel: IHotel;
}

export interface IFaq {
    _id?: string;
    question: string;
    answer: string;
}

export interface IBooking {
    _id?: string;
    user: string | IUser;
    room: string | IRoom;
    bookingStartDate: string;
    bookingEndDate: string;
    address: string;
    totalDays: number;
    totalCost: number;
    status: 'pending' | 'accetpt' | 'reject' | 'adjust' | 'cancel';
}

export interface IReview {
    _id?: string;
    review: string;
    room: string | IRoom;
    user: string | IUser;
    booking: string | IBooking;
}
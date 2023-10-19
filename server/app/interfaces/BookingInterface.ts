import { IUser } from "./UserInterface";
import { IRoom } from "./RoomInterface";

export interface IBooking {
    _id?: string;
    user: string | IUser;
    room: string | IRoom;
    bookingStartDate: string;
    bookingEndDate: string;
    address: string;
    totalDays: number;
    totalCost: number;
    status: 'pending' | 'accept' | 'reject' | 'adjust' | 'cancel';
    isReviewed: boolean;
}
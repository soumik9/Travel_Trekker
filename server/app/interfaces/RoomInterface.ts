import { Types } from "mongoose";

export interface IRoom {
    _id?: string;
    roomNumber: string;
    roomType: string;
    price: number;
    isAvailable: boolean;
    hotel: string | Types.ObjectId | undefined;
}
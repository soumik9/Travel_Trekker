import { Types } from "mongoose";

export interface IHotel {
    _id?: string;
    name: string;
    image: string;
    location: string;
    rating: number;
    isAvailable: boolean;
    rooms: string[] | Types.ObjectId[] | undefined;
}
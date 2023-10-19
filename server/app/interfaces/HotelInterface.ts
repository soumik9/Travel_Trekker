import { Types } from "mongoose";
import { IRoom } from "./RoomInterface";

export interface IHotel {
    _id?: string;
    name: string;
    image: string;
    location: string;
    rating: number;
    isAvailable: boolean;
    rooms: Types.ObjectId[] | IRoom[];
}
import { Types } from "mongoose";

export interface IReview {
    _id?: string;
    review: string;
    room: string | Types.ObjectId | undefined;
    user: string | Types.ObjectId | undefined;
    booking: string | Types.ObjectId | undefined;
}
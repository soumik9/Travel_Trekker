import { Schema, Types, model } from "mongoose";
import { IReview } from "../interfaces/ReviewInterface";

const reviewSchema = new Schema<IReview>({
    review: {
        type: String,
        required: [true, 'Review field is required']
    },
    booking: {
        type: Types.ObjectId,
        ref: "Booking",
        required: [true, 'Booking id field is required']
    },
    room: {
        type: Types.ObjectId,
        ref: "Room",
        required: [true, 'room id field is required']
    },
    user: {
        type: Types.ObjectId,
        ref: "Room",
        required: [true, 'User id field is required']
    },
}, { timestamps: true });

const Review = model<IReview>("Review", reviewSchema);
export default Review;
import { Schema, Types, model } from "mongoose";
import { IHotel } from "../interfaces/HotelInterface";

const hotelSchema = new Schema<IHotel>({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    image: {
        type: String,
        default: 'https://asset.cloudinary.com/duc8f3yvq/e300c48d78017427abb1a9b5effe09aa'
    },
    location: {
        type: String,
        required: [true, 'Location field is required'],
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
    },
    rooms: [
        {
            type: Types.ObjectId,
            ref: "Room"
        },
    ],
}, { timestamps: true });

const Hotel = model<IHotel>("Hotel", hotelSchema);
export default Hotel;
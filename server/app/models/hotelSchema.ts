import { Schema, Types, model } from "mongoose";
import { IHotel } from "../interfaces/HotelInterface";

const hotelSchema = new Schema<IHotel>({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    image: {
        type: String,
        default: 'https://res.cloudinary.com/duc8f3yvq/image/upload/v1697143683/download_vpdfwv.jpg'
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
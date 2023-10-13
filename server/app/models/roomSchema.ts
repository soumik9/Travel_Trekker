import { Schema, Types, model } from "mongoose";
import { IRoom } from "../interfaces/RoomInterface";

const roomSchema = new Schema<IRoom>({
    roomNumber: {
        type: String,
        required: [true, 'Room number field is required']
    },
    roomType: {
        type: String,
        required: [true, 'Room type field is required']
    },
    price: {
        type: Number,
        required: [true, 'price field is required']
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    hotel: {
        type: Types.ObjectId,
        ref: "Hotel",
        required: [true, 'Hotel id field is required']
    },
}, { timestamps: true });

const Room = model<IRoom>("Room", roomSchema);
export default Room;
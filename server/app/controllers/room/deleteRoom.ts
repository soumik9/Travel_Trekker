import { Request, RequestHandler, Response } from "express";
import User from "../../models/userSchema";
import catchAsync from "../../../utils/helpers/catchAsync";
import sendResponse from "../../../utils/helpers/SendResponse";
import httpStatus from "http-status";
import ApiError from "../../../utils/errors/ApiError";
import Hotel from "../../models/hotelSchema";
import Room from "../../models/roomSchema";

const deleteRoom: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {

        const roomId = req.params.roomId;

        // checking is user available
        const room = await Room.findOne({ _id: roomId });
        if (!room) throw new ApiError(httpStatus.NOT_FOUND, 'Check is hotel available!');

        // deleting data
        const result = await Room.deleteOne({ _id: roomId });

        if (result.deletedCount > 0) {
            const hotelId = room.hotel;

            await Hotel.updateOne({ _id: hotelId }, {
                $pull: { rooms: roomId }
            });
        }

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Room deleted successfully!',
        });
    }
)

export default deleteRoom
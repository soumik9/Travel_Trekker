import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../../utils/helpers/SendResponse";
import catchAsync from "../../../utils/helpers/catchAsync";
import ApiError from "../../../utils/errors/ApiError";
import Room from "../../models/roomSchema";
import Hotel from "../../models/hotelSchema";

const createRoom: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {

        // Check if a user with the same email already exists
        const existingHotel = await Hotel.findOne({ _id: req.body.hotel }).populate('rooms');

        if (!existingHotel) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'No hotel with this name/id exists.');
        }

        // checking is room exists for hotel
        if (existingHotel.rooms?.find((item: any) => parseInt(item.roomNumber) === parseInt(req.body.roomNumber))) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Room number exists for this hotel already.');
        }

        const result = await Room.create(req.body);

        if (result._id) {
            await Hotel.updateOne({ _id: req.body.hotel }, {
                $push: {
                    rooms: result._id,
                },
            }, { new: true });
        } else {
            await Room.deleteOne({ _id: result._id });
            throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create hotel room.');
        }

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: `Room created successfully!`,
        });
    }
)

export default createRoom
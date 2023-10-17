import { Request, RequestHandler, Response } from "express";
import User from "../../models/userSchema";
import catchAsync from "../../../utils/helpers/catchAsync";
import sendResponse from "../../../utils/helpers/SendResponse";
import httpStatus from "http-status";
import ApiError from "../../../utils/errors/ApiError";
import Hotel from "../../models/hotelSchema";
import Room from "../../models/roomSchema";

const deleteHotel: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {

        const hotelId = req.params.hotelId;

        // checking is user available
        const hotel = await Hotel.findOne({ _id: hotelId });
        if (!hotel) throw new ApiError(httpStatus.NOT_FOUND, 'Check is hotel available!');

        // deleting data
        const result = await Hotel.deleteOne({ _id: hotelId });

        if (result) {
            await Room.deleteMany({ hotel: hotelId })
        }

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Hotel deleted successfully!',
        });
    }
)

export default deleteHotel
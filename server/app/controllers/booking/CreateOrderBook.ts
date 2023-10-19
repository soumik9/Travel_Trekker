import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../../utils/helpers/SendResponse";
import catchAsync from "../../../utils/helpers/catchAsync";
import ApiError from "../../../utils/errors/ApiError";
import Hotel from "../../models/hotelSchema";
import Booking from "../../models/bookingSchema";

const createOrderBook: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {

        // // Check if a user with the same email already exists
        // const existingHotel = await Hotel.findOne({ name: req.body.name });

        // if (existingHotel) {
        //     throw new ApiError(httpStatus.BAD_REQUEST, 'An hotel with this name already exists.');
        // }

        await Booking.create({
            ...req.body,
            user: req?.user?._id
        });

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: `Hotel booked successfully!`,
        });
    }
)

export default createOrderBook
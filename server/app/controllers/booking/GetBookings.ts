import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../utils/helpers/catchAsync";
import sendResponse from "../../../utils/helpers/SendResponse";
import httpStatus from "http-status";
import Booking from "../../models/bookingSchema";

const getBookings: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {

        // finding hotel
        const result = await Booking.find().populate('room user').select({ __v: 0 });

        sendResponse<any>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Bookings retrieved successfully!',
            data: result,
        });
    }
)

export default getBookings
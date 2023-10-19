import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../utils/helpers/catchAsync";
import sendResponse from "../../../utils/helpers/SendResponse";
import httpStatus from "http-status";
import Booking from "../../models/bookingSchema";

const GetBooking: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {

        // finding room
        const orderId = req.params.orderId;
        const result = await Booking.findOne({ _id: orderId }).select({ __v: 0 });

        sendResponse<any>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Booking retrieved successfully!',
            data: result,
        });
    }
)

export default GetBooking
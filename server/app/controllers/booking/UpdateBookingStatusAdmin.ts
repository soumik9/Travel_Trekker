import { RequestHandler, Response } from "express";
import { IRequestFile } from "../../../utils/type/types";
import sendResponse from "../../../utils/helpers/SendResponse";
import httpStatus from "http-status";
import catchAsync from "../../../utils/helpers/catchAsync"
import Room from "../../models/roomSchema";
import Hotel from "../../models/hotelSchema";
import ApiError from "../../../utils/errors/ApiError";
import Booking from "../../models/bookingSchema";

const UpdateBookingStatusAdmin: RequestHandler = catchAsync(
    async (req: IRequestFile, res: Response) => {

        const bookingId = req.params.bookingId;
        let body = req.body;

        const booking = await Booking.findById(bookingId);
        if (!booking) throw new ApiError(httpStatus.NOT_FOUND, 'Check is booking available!');

        // updating status
        await Booking.findOneAndUpdate({ _id: bookingId }, {
            $set: {
                status: body.status
            }
        }, { new: true, runValidators: true })

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Booking status updated successfully!',
        });
    }
)

export default UpdateBookingStatusAdmin
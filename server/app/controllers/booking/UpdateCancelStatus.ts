import { RequestHandler, Response } from "express";
import { IRequestFile } from "../../../utils/type/types";
import sendResponse from "../../../utils/helpers/SendResponse";
import httpStatus from "http-status";
import catchAsync from "../../../utils/helpers/catchAsync"
import ApiError from "../../../utils/errors/ApiError";
import Booking from "../../models/bookingSchema";

const UpdateCancelStatus: RequestHandler = catchAsync(
    async (req: IRequestFile, res: Response) => {

        const bookingId = req.params.bookingId;
        let body = req.body;

        const booking = await Booking.findById(bookingId);
        if (!booking) throw new ApiError(httpStatus.NOT_FOUND, 'Check is booking available!');

        if (booking.status === 'accept') {
            throw new ApiError(httpStatus.NOT_FOUND, 'Cant change on accept status!');
        }

        // updating status
        await Booking.findOneAndUpdate({ _id: bookingId }, {
            $set: {
                status: 'cancel'
            }
        }, { new: true, runValidators: true })

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Booking status updated successfully!',
        });
    }
)

export default UpdateCancelStatus
import { RequestHandler, Response, Request } from "express";
import User from "../../models/userSchema";
import sendResponse from "../../../utils/helpers/SendResponse";
import httpStatus from "http-status";
import catchAsync from "../../../utils/helpers/catchAsync";
import ApiError from "../../../utils/errors/ApiError";
import Booking from "../../models/bookingSchema";

const GetOrdersById: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {

        const userId = req.user?._id;

        // checking is user available
        const user = await User.findOne({ _id: userId });
        if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'Check is user available!');

        // updating user
        const result = await Booking.find({ user: userId }).populate('user room')

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Orders retrived successfully!',
            data: result
        });
    }
)

export default GetOrdersById
import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../../utils/helpers/SendResponse";
import catchAsync from "../../../utils/helpers/catchAsync";
import ApiError from "../../../utils/errors/ApiError";
import Review from "../../models/reviewSchema";

const CreateReview: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {

        // Check if a user with the same email already exists
        const existingBooking = await Review.findOne({ name: req.body.booking });

        if (existingBooking) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'An review with this order already exists.');
        }

        await Review.create({
            ...req.body,
            user: req.user?._id
        });

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: `Review created successfully!`,
        });
    }
)

export default CreateReview
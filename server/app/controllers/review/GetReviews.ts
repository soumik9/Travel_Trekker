import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../utils/helpers/catchAsync";
import sendResponse from "../../../utils/helpers/SendResponse";
import httpStatus from "http-status";
import Review from "../../models/reviewSchema";

const GetReviews: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {

        // finding hotel
        const result = await Review.find().populate('room user').select({ __v: 0 });

        sendResponse<any>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'reviews retrieved successfully!',
            data: result,
        });
    }
)

export default GetReviews
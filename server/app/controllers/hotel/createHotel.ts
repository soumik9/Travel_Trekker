import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../../utils/helpers/SendResponse";
import catchAsync from "../../../utils/helpers/catchAsync";
import ApiError from "../../../utils/errors/ApiError";
import Hotel from "../../models/hotelSchema";

const createHotel: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {

        // Check if a user with the same email already exists
        const existingHotel = await Hotel.findOne({ name: req.body.name });

        if (existingHotel) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'An hotel with this name already exists.');
        }

        await Hotel.create(req.body);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: `Hotel created successfully!`,
        });
    }
)

export default createHotel
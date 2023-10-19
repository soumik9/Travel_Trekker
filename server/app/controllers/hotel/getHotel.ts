import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../utils/helpers/catchAsync";
import sendResponse from "../../../utils/helpers/SendResponse";
import httpStatus from "http-status";
import { IHotel } from "../../interfaces/HotelInterface";
import Hotel from "../../models/hotelSchema";

const getHotel: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {

        // finding hotel
        const hotelId = req.params.hotelId;
        const result = await Hotel.findOne({ _id: hotelId }).populate('rooms').select({ __v: 0 });

        sendResponse<IHotel>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Hotel retrieved successfully!',
            data: result,
        });
    }
)

export default getHotel
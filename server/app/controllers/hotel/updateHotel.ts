import { RequestHandler, Response } from "express";
import { IRequestFile } from "../../../utils/type/types";
import sendResponse from "../../../utils/helpers/SendResponse";
import httpStatus from "http-status";
import catchAsync from "../../../utils/helpers/catchAsync"
import Hotel from "../../models/hotelSchema";

const updateHotel: RequestHandler = catchAsync(
    async (req: IRequestFile, res: Response) => {

        const hotelId = req.params.hotelId;
        let body = req.body;

        // updating user
        await Hotel.findOneAndUpdate({ _id: hotelId }, {
            $set: body
        }, { new: true, runValidators: true })

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Hotel updated successfully!',
        });
    }
)

export default updateHotel
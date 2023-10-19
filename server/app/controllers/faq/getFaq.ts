import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../utils/helpers/catchAsync";
import sendResponse from "../../../utils/helpers/SendResponse";
import httpStatus from "http-status";
import { IRoom } from "../../interfaces/RoomInterface";
import Room from "../../models/roomSchema";

const getFaq: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {

        // finding faq
        const faqId = req.params.faqId;
        const result = await Room.findOne({ _id: faqId }).select({ __v: 0 });

        sendResponse<IRoom>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Faq retrieved successfully!',
            data: result,
        });
    }
)

export default getFaq
import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../utils/helpers/catchAsync";
import sendResponse from "../../../utils/helpers/SendResponse";
import httpStatus from "http-status";
import { IRoom } from "../../interfaces/RoomInterface";
import Room from "../../models/roomSchema";

const getRoom: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {

        // finding room
        const roomId = req.params.roomId;
        const result = await Room.findOne({ _id: roomId }).select({ __v: 0 });

        sendResponse<IRoom>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Room retrieved successfully!',
            data: result,
        });
    }
)

export default getRoom
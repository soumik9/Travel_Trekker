import { RequestHandler, Response } from "express";
import { IRequestFile } from "../../../utils/type/types";
import sendResponse from "../../../utils/helpers/SendResponse";
import httpStatus from "http-status";
import catchAsync from "../../../utils/helpers/catchAsync"
import Room from "../../models/roomSchema";

const updateRoom: RequestHandler = catchAsync(
    async (req: IRequestFile, res: Response) => {

        const roomId = req.params.roomId;
        let body = req.body;

        // updating user
        await Room.findOneAndUpdate({ _id: roomId }, {
            $set: body
        }, { new: true, runValidators: true })

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Room updated successfully!',
        });
    }
)

export default updateRoom
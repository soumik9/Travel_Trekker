import { RequestHandler, Response } from "express";
import { IRequestFile } from "../../../utils/type/types";
import sendResponse from "../../../utils/helpers/SendResponse";
import httpStatus from "http-status";
import catchAsync from "../../../utils/helpers/catchAsync"
import Room from "../../models/roomSchema";
import Hotel from "../../models/hotelSchema";
import ApiError from "../../../utils/errors/ApiError";

const updateRoom: RequestHandler = catchAsync(
    async (req: IRequestFile, res: Response) => {

        const roomId = req.params.roomId;
        let body = req.body;

        const room = await Room.findById(roomId);
        if (!room) throw new ApiError(httpStatus.NOT_FOUND, 'Check is room available!');

        // updating room
        const result = await Room.findOneAndUpdate({ _id: roomId }, {
            $set: body
        }, { new: true, runValidators: true })

        if (result) {
            if (room?.hotel?.toString() !== body.hotel) {

                const hotelId = room?.hotel;

                await Hotel.updateOne({ _id: hotelId }, {
                    $pull: { rooms: roomId }
                });

                await Hotel.updateOne({ _id: body.hotel }, {
                    $push: {
                        rooms: roomId,
                    },
                }, { new: true });
            }
        }

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Room updated successfully!',
        });
    }
)

export default updateRoom
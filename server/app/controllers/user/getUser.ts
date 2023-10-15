import { Request, RequestHandler, Response } from "express";
import User from "../../models/userSchema";
import catchAsync from "../../../utils/helpers/catchAsync";
import sendResponse from "../../../utils/helpers/SendResponse";
import { IUser } from "../../interfaces/UserInterface";
import httpStatus from "http-status";

const getUser: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {

        // finding user
        const userId = req.params.userId;
        const result = await User.findById(userId).select({ __v: 0 });

        sendResponse<IUser>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'User retrieved successfully!',
            data: result,
        });
    }
)

export default getUser
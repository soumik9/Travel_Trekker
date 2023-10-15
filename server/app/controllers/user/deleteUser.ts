import { Request, RequestHandler, Response } from "express";
import User from "../../models/userSchema";
import catchAsync from "../../../utils/helpers/catchAsync";
import sendResponse from "../../../utils/helpers/SendResponse";
import httpStatus from "http-status";
import ApiError from "../../../utils/errors/ApiError";

const deleteUser: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {

        const userId = req.params.userId;

        // checking is user available
        const user = await User.findOne({ _id: userId });
        if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'Check is role available!');

        // if admin user delete request
        if (user.email === 'admin@admin.com') throw new ApiError(httpStatus.FORBIDDEN, 'Please contact admin to delete user!');

        // deleting data
        await User.deleteOne({ _id: userId })

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'User deleted successfully!',
        });
    }
)

export default deleteUser
import { RequestHandler, Response } from "express";
import bcrypt from 'bcrypt'
import User from "../../models/userSchema";
import { IRequestFile } from "../../../utils/type/types";
import sendResponse from "../../../utils/helpers/SendResponse";
import httpStatus from "http-status";
import catchAsync from "../../../utils/helpers/catchAsync";
import config from "../../../utils/server/config";
import ApiError from "../../../utils/errors/ApiError";

const updateUserByAuthId: RequestHandler = catchAsync(
    async (req: IRequestFile, res: Response) => {

        const userId = req.user?._id;
        let body = req.body;

        // checking is user available
        const user = await User.findOne({ _id: userId });
        if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'Check is user available!');

        // cut out some data which should not be updated
        let { password, email, ...updatedData } = body;


        // if there is password and confirm password
        if (body.password && body.password !== 'undefined') {
            // converting to hash passowrd
            const hashedPassword = await bcrypt.hash(body.password, Number(config.BYCRYPT_SALT_ROUND));
            updatedData = { ...updatedData, password: hashedPassword }
        }

        // updating user
        await User.findOneAndUpdate({ _id: userId }, {
            $set: updatedData
        }, { new: true, runValidators: true })

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Profile updated successfully!',
        });
    }
)

export default updateUserByAuthId
import { RequestHandler, Response } from "express";
import bcrypt from 'bcrypt'
import User from "../../models/userSchema";
import { IRequestFile } from "../../../utils/type/types";
import sendResponse from "../../../utils/helpers/SendResponse";
import httpStatus from "http-status";
import catchAsync from "../../../utils/helpers/catchAsync";
import config from "../../../utils/server/config";

const updateUser: RequestHandler = catchAsync(
    async (req: IRequestFile, res: Response) => {

        const userId = req.params.userId;
        let body = req.body;

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
            message: 'User updated successfully!',
        });
    }
)

export default updateUser
import { RequestHandler, Response } from "express";
import bcrypt from 'bcrypt'
import User from "../../models/userSchema";
import { IRequestFile } from "../../../utils/type/types";
import sendResponse from "../../../utils/helpers/SendResponse";
import httpStatus from "http-status";
import catchAsync from "../../../utils/helpers/catchAsync";
import ApiError from "../../../utils/errors/ApiError";
import { ENUM_USER_ROLE } from "../../../utils/constants/constants";
import config from "../../../utils/server/config";
import { IUploadFile } from "../../../utils/type/file";
import uploadToCloudinary from "../../../utils/helpers/uploadToCloudinary";

const updateUser: RequestHandler = catchAsync(
    async (req: IRequestFile, res: Response) => {

        const userId = req.params.userId;
        let body = JSON.parse(req.body.data);

        // cut out some data which should not be updated
        let { password, confirmPassword, image, email, username, ...updatedData } = body;

        // if there is file, uploading file
        if (req.file) {
            const file = req.file as IUploadFile;
            const uploadedImage = await uploadToCloudinary(file);

            if (!uploadedImage?.secure_url) {
                throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to upload image!');
            } else {
                updatedData.image = uploadedImage.secure_url
            }
        }

        // if not admin remove all permissions
        if (body.role.name !== ENUM_USER_ROLE.ADMIN) {
            updatedData.role.permissions = [];
        }

        // if there is password and confirm password
        if (body.password && body.password !== 'undefined' && body.confirmPassword && body.confirmPassword !== 'undefined') {

            // checking is password matched
            if (body.password !== body.confirmPassword) throw new ApiError(httpStatus.NOT_FOUND, `Password didn't matched!`);

            // converting to hash passowrd
            const hashedPassword = await bcrypt.hash(body.password, Number(config.BYCRYPT_SALT_ROUND));
            updatedData = { ...updatedData, password: hashedPassword, confirmPassword: undefined }
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
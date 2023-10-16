import { RequestHandler, Response } from "express";
import User from "../../models/userSchema";
import { IRequestFile } from "../../../utils/type/types";
import httpStatus from "http-status";
import sendResponse from "../../../utils/helpers/SendResponse";
import catchAsync from "../../../utils/helpers/catchAsync";
import ApiError from "../../../utils/errors/ApiError";
import { ENUM_USER_ROLE } from "../../../utils/constants/constants";

const userSignup: RequestHandler = catchAsync(
    async (req: IRequestFile, res: Response) => {

        let body = req.body;
        const email = body.email;

        // Check if a user with the same email already exists
        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'An account with this email already exists.');
        }

        // uploading file
        if (body.name) {
            body.image = `https://ui-avatars.com/api/?name=${body.name}`;
        }

        body.role = ENUM_USER_ROLE.USER;
        await User.create(body);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: `User (${body.name}) created successfully!`,
        });
    }
)

export default userSignup
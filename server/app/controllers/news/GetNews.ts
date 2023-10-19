import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../../utils/helpers/SendResponse";
import catchAsync from "../../../utils/helpers/catchAsync";
import News from "../../models/newsSchema";

const GetNews: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {

        // get faqs
        const result = await News.find().select({ __v: 0 });

        sendResponse<any>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'News are retrieved successfully!',
            data: result,
        });
    }
)

export default GetNews
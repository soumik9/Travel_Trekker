import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../../utils/helpers/SendResponse";
import catchAsync from "../../../utils/helpers/catchAsync";
import FAQ from "../../models/faqSchema";

const createFaq: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {

        await FAQ.create(req.body);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: `Faq created successfully!`,
        });
    }
)

export default createFaq
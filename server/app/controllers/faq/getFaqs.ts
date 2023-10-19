import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../../utils/helpers/SendResponse";
import catchAsync from "../../../utils/helpers/catchAsync";
import FAQ from "../../models/faqSchema";
import { IFaq } from "../../interfaces/FaqInterface";

const getFaqs: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {

        // get faqs
        const result = await FAQ.find().select({ __v: 0 });

        sendResponse<IFaq[]>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Faqs are retrieved successfully!',
            data: result,
        });
    }
)

export default getFaqs
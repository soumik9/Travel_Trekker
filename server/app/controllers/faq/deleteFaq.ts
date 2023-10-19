import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../utils/helpers/catchAsync";
import sendResponse from "../../../utils/helpers/SendResponse";
import httpStatus from "http-status";
import ApiError from "../../../utils/errors/ApiError";
import FAQ from "../../models/faqSchema";

const deleteFaq: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {

        const faqId = req.params.faqId;

        // checking is user available
        const faq = await FAQ.findOne({ _id: faqId });
        if (!faq) throw new ApiError(httpStatus.NOT_FOUND, 'Check is faq available!');

        // deleting data
        await FAQ.deleteOne({ _id: faqId });

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Faq deleted successfully!',
        });
    }
)

export default deleteFaq
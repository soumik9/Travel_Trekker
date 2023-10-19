import { RequestHandler, Response } from "express";
import { IRequestFile } from "../../../utils/type/types";
import sendResponse from "../../../utils/helpers/SendResponse";
import httpStatus from "http-status";
import catchAsync from "../../../utils/helpers/catchAsync"
import ApiError from "../../../utils/errors/ApiError";
import FAQ from "../../models/faqSchema";

const updateFaq: RequestHandler = catchAsync(
    async (req: IRequestFile, res: Response) => {

        const faqId = req.params.faqId;
        let body = req.body;

        const faq = await FAQ.findById(faqId);
        if (!faq) throw new ApiError(httpStatus.NOT_FOUND, 'Check is faq available!');

        // updating faq
        await FAQ.findOneAndUpdate({ _id: faqId }, {
            $set: body
        }, { new: true, runValidators: true })

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Faq updated successfully!',
        });
    }
)

export default updateFaq
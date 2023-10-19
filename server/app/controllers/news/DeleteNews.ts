import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../utils/helpers/catchAsync";
import sendResponse from "../../../utils/helpers/SendResponse";
import httpStatus from "http-status";
import ApiError from "../../../utils/errors/ApiError";
import News from "../../models/newsSchema";

const DeleteNews: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {

        const newsId = req.params.newsId;

        // checking is user available
        const news = await News.findOne({ _id: newsId });
        if (!news) throw new ApiError(httpStatus.NOT_FOUND, 'Check is news available!');

        // deleting data
        await News.deleteOne({ _id: newsId });

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'News deleted successfully!',
        });
    }
)

export default DeleteNews
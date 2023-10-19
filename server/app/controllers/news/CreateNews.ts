import { RequestHandler, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../../utils/helpers/SendResponse";
import catchAsync from "../../../utils/helpers/catchAsync";
import News from "../../models/newsSchema";
import { IRequestFile } from "../../../utils/type/types";

const CreateNews: RequestHandler = catchAsync(
  async (req: IRequestFile, res: Response) => {

    await News.create(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `News created successfully!`,
    });
  }
)

export default CreateNews
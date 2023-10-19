import { RequestHandler, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../../utils/helpers/SendResponse";
import catchAsync from "../../../utils/helpers/catchAsync";
import News from "../../models/newsSchema";
import uploadToCloudinary from "../../../utils/helpers/uploadToCloudinary";
import { IUploadFile } from "../../../utils/type/file";
import ApiError from "../../../utils/errors/ApiError";
import { IRequestFile } from "../../../utils/type/types";

const CreateNews: RequestHandler = catchAsync(
  async (req: IRequestFile, res: Response) => {

    let body = JSON.parse(req.body.data);

    // uploading file
    if (req?.file) {
      const file = req.file as IUploadFile;
      const uploadedImage = await uploadToCloudinary(file);

      if (!uploadedImage?.secure_url) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to upload image!');
      } else {
        body.image = uploadedImage.secure_url
      }
    }

    await News.create(body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `News created successfully!`,
    });
  }
)

export default CreateNews
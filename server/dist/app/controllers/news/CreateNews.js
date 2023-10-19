"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const SendResponse_1 = __importDefault(require("../../../utils/helpers/SendResponse"));
const catchAsync_1 = __importDefault(require("../../../utils/helpers/catchAsync"));
const newsSchema_1 = __importDefault(require("../../models/newsSchema"));
const uploadToCloudinary_1 = __importDefault(require("../../../utils/helpers/uploadToCloudinary"));
const ApiError_1 = __importDefault(require("../../../utils/errors/ApiError"));
const CreateNews = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let body = JSON.parse(req.body.data);
    // uploading file
    if (req === null || req === void 0 ? void 0 : req.file) {
        const file = req.file;
        const uploadedImage = yield (0, uploadToCloudinary_1.default)(file);
        if (!(uploadedImage === null || uploadedImage === void 0 ? void 0 : uploadedImage.secure_url)) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to upload image!');
        }
        else {
            body.image = uploadedImage.secure_url;
        }
    }
    yield newsSchema_1.default.create(body);
    (0, SendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `News created successfully!`,
    });
}));
exports.default = CreateNews;

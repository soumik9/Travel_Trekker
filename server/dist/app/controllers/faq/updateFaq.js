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
const SendResponse_1 = __importDefault(require("../../../utils/helpers/SendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../utils/helpers/catchAsync"));
const ApiError_1 = __importDefault(require("../../../utils/errors/ApiError"));
const faqSchema_1 = __importDefault(require("../../models/faqSchema"));
const updateFaq = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const faqId = req.params.faqId;
    let body = req.body;
    const faq = yield faqSchema_1.default.findById(faqId);
    if (!faq)
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Check is faq available!');
    // updating faq
    yield faqSchema_1.default.findOneAndUpdate({ _id: faqId }, {
        $set: body
    }, { new: true, runValidators: true });
    (0, SendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Faq updated successfully!',
    });
}));
exports.default = updateFaq;

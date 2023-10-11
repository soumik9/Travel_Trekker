import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import config from '../server/config';
import ApiError from '../errors/ApiError';
import handleValidationError from '../errors/handleValidationError';
import handleCastError from '../errors/handleCastError';
import { IErrorMessage } from '../type/types';


const globalErrorHandler: ErrorRequestHandler = (
    error,
    req: Request,
    res: Response,
    next: NextFunction
) => {

    let statusCode = 500;
    let message = 'Something went wrong !';
    let errorMessages: IErrorMessage[] = [];

    if (error?.name === 'ValidationError') {
        const simplifiedError = handleValidationError(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    } else if (error?.name === 'CastError') {
        const simplifiedError = handleCastError(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    } else if (error instanceof ApiError) {
        statusCode = error?.statusCode;
        message = error.message;
        errorMessages = error?.message
            ? [
                {
                    path: '',
                    message: error?.message,
                },
            ]
            : [];
    } else if (error instanceof Error) {
        message = error?.message;
        errorMessages = error?.message
            ? [
                {
                    path: '',
                    message: error?.message,
                },
            ]
            : [];
    }

    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: config.env !== 'production' ? error?.stack : undefined,
    });
};

export default globalErrorHandler;
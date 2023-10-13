import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../../utils/helpers/SendResponse";
import catchAsync from "../../../utils/helpers/catchAsync";
import ApiError from "../../../utils/errors/ApiError";
import Hotel from "../../models/hotelSchema";
import pick from "../../../utils/helpers/pick";
import { paginationProps } from "../../../utils/constants/constants";
import calculatePagination from "../../../utils/helpers/calculatePagination";
import { SortOrder } from "mongoose";
import { IHotel } from "../../interfaces/HotelInterface";

export const hotelFilterableFields: string[] = ['searchTerm', 'name', 'location'];
export const hotelSearchableFields: string[] = ['email']

const getHotels: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {

        const andConditions: any = [];
        const filters = pick(req.query, hotelFilterableFields);
        const { searchTerm, ...filtersData } = filters;

        // pagination and sorting
        const paginationOptions = pick(req.query, paginationProps);
        const { limit, page, skip, sortBy, sortOrder } = calculatePagination(paginationOptions);

        // sorting
        const sortConditions: { [key: string]: SortOrder } = {};
        if (sortBy && sortOrder) { sortConditions[sortBy] = sortOrder; }

        // if there is searching query
        if (searchTerm) {
            andConditions.push({
                $or: hotelSearchableFields.map(field => ({
                    [field]: {
                        $regex: searchTerm,
                        $options: 'i',
                    },
                })),
            });
        }

        // if any filterable query make it on object
        if (Object.keys(filtersData).length) {
            andConditions.push({
                $and: Object.entries(filtersData).map(([field, value]) => ({
                    [field]: value,
                })),
            });
        }

        // finalizing the where condition
        const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};

        // get books
        const result = await Hotel.find(whereConditions).sort(sortConditions).select({ __v: 0 });
        const totalRecords = await Hotel.countDocuments();

        sendResponse<IHotel[]>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Hotels are retrieved successfully!',
            meta: {
                total: totalRecords,
                showingTotal: result.length,
            },
            data: result,
        });
    }
)

export default getHotels
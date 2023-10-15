import { Request, RequestHandler, Response } from "express";
import User from "../../models/userSchema";
import catchAsync from "../../../utils/helpers/catchAsync";
import sendResponse from "../../../utils/helpers/SendResponse";
import { IUser } from "../../interfaces/UserInterface";
import httpStatus from "http-status";
import pick from "../../../utils/helpers/pick";
import { paginationProps } from "../../../utils/constants/constants";
import calculatePagination from "../../../utils/helpers/calculatePagination";
import { SortOrder } from "mongoose";

export const userFilterableFields: string[] = ['searchTerm', 'email', 'address.city', 'role.name'];
export const userSearchableFields: string[] = ['email']

const getUsers: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {

        const andConditions: any = [];
        const filters = pick(req.query, userFilterableFields);
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
                $or: userSearchableFields.map(field => ({
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
        const result = await User.find(whereConditions).sort(sortConditions).select({ __v: 0 });
        const totalRecords = await User.countDocuments();

        sendResponse<IUser[]>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Users are retrieved successfully!',
            meta: {
                total: totalRecords,
                showingTotal: result.length,
            },
            data: result,
        });
    }
)

export default getUsers
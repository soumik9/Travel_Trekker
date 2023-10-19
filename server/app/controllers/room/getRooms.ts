import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../../utils/helpers/SendResponse";
import catchAsync from "../../../utils/helpers/catchAsync";
import pick from "../../../utils/helpers/pick";
import { paginationProps } from "../../../utils/constants/constants";
import calculatePagination from "../../../utils/helpers/calculatePagination";
import { SortOrder } from "mongoose";
import Room from "../../models/roomSchema";
import { IRoom } from "../../interfaces/RoomInterface";

export const roomFilterableFields: string[] = ['searchTerm', 'roomNumber', 'hotel.name', 'hotel._id'];
export const roomSearchableFields: string[] = ['email']

const getRooms: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {

        const andConditions: any = [];
        const filters = pick(req.query, roomFilterableFields);
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
                $or: roomSearchableFields.map(field => ({
                    [field]: {
                        $regex: searchTerm,
                        $options: 'i',
                    },
                })),
            });
        }

        // Decode URL-encoded values in the filtersData object
        for (const key in filtersData) {
            if (filtersData.hasOwnProperty(key)) {
                filtersData[key] = decodeURIComponent(filtersData[key] as any);
            }
        }

        // console.log(filtersData);

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
        const result = await Room.find(whereConditions).sort(sortConditions).populate('hotel').select({ __v: 0 });
        const totalRecords = await Room.countDocuments();

        sendResponse<IRoom[]>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Rooms are retrieved successfully!',
            meta: {
                total: totalRecords,
                showingTotal: result.length,
            },
            data: result,
        });
    }
)

export default getRooms
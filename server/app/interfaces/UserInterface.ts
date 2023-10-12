import { Model, Types } from "mongoose";
import { ENUM_USER_ROLE } from "../../utils/constants/constants";

export type IRole = ENUM_USER_ROLE.SUPER_ADMIN | ENUM_USER_ROLE.ADMIN | ENUM_USER_ROLE.USER;

export interface IUser {
    _id?: string;
    name: string;
    image: string;
    email: string;
    password: string;
    role: IRole;
    services: Types.ObjectId;
    reviews: Types.ObjectId;
    // services: Types.ObjectId | IAccount;
    orders: string[] | Types.ObjectId[];
}

export interface IUserMethods {
    isUserExist(param: string): Promise<boolean | null>;
    isPasswordMatched(givenPassword: string, savedPassword: string): Promise<boolean>;
}

export type UserModel = Model<IUser, {}, IUserMethods>;
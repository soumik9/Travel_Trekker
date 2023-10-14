import { ENUM_USER_ROLE } from "./constants";

export interface ILogin {
    email: string; password: string;
}

export type IRole = ENUM_USER_ROLE.SUPER_ADMIN | ENUM_USER_ROLE.ADMIN | ENUM_USER_ROLE.USER;

export interface IUser {
    _id?: string;
    name: string;
    image: string;
    email: string;
    password: string;
    role: IRole;
    services: string[];
    reviews: string[];
    orders: string[];
}
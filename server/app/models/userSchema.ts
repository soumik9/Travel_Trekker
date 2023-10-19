import { Schema, model, Types } from 'mongoose';
import bcrypt from 'bcrypt';
import { NextFunction } from 'connect';
import { IUser, IUserMethods } from '../interfaces/UserInterface';
import validator from "validator";
import { ENUM_USER_ROLE } from '../../utils/constants/constants';
import config from '../../utils/server/config';

export const userRoles = [ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER]

const userSchema = new Schema<IUser, {}, IUserMethods>({
    name: {
        type: String,
        required: [true, 'Name filed is required']
    },
    image: String,
    email: {
        type: String,
        required: [true, 'Email filed is required'],
        // unique: true,
        validate: [validator.isEmail, 'Please provide a valid email.'],
    },
    password: {
        type: String,
        required: [true, 'Password filed is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
    },
    role: {
        type: String,
        lowercase: true,
        required: [true, 'Role name is required'],
        enum: {
            values: userRoles,
            message: `Role value can not be {VALUE}, must be ${ENUM_USER_ROLE.ADMIN}/${ENUM_USER_ROLE.SUPER_ADMIN}/${ENUM_USER_ROLE.USER}`
        }
    },
    services: [
        {
            type: Types.ObjectId,
            ref: "Service"
        },
    ],
    reviews: [
        {
            type: Types.ObjectId,
            ref: "Review"
        },
    ],
    orders: [
        {
            type: Types.ObjectId,
            ref: "Order"
        },
    ],
}, { timestamps: true });

// checking is user exists
userSchema.methods.isUserExist = async function (param: string): Promise<boolean | null> {
    return await User.findOne({ email: param });
}

// checking is password matched
userSchema.methods.isPasswordMatched = async function (givenPassword: string, savedPassword: string): Promise<boolean> {
    return await bcrypt.compare(givenPassword, savedPassword);
}

// create or save works for both
userSchema.pre("save", async function (next: NextFunction) {
    if (!this.isModified("password")) {
        return next();
    }

    const password = this.password;
    const hashedPassword = await bcrypt.hashSync(password, Number(config.BYCRYPT_SALT_ROUND));

    this.password = hashedPassword;

    next();
});

const User = model<IUser>("User", userSchema);
export default User;

// Define a schema for hotels
// const hotelSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   location: {
//     type: String,
//     required: true,
//   },
//   description: String,
//   rating: {
//     type: Number,
//     min: 0,
//     max: 5,
//     default: 0,
//   },
//   rooms: [
//     {
//       roomNumber: String,
//       roomType: String,
//       price: Number,
//       isAvailable: {
//         type: Boolean,
//         default: true,
//       },
//     },
//   ],
// });

// // Define a schema for bookings
// const bookingSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User', // Assuming you have a User schema
//     required: true,
//   },
//   hotel: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Hotel',
//     required: true,
//   },
//   room: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Hotel.rooms',
//     required: true,
//   },
//   checkIn: {
//     type: Date,
//     required: true,
//   },
//   checkOut: {
//     type: Date,
//     required: true,
//   },
//   totalPrice: {
//     type: Number,
//     required: true,
//   },
// });

// // Create the Hotel and Booking models
// const Hotel = mongoose.model('Hotel', hotelSchema);
// const Booking = mongoose.model('Booking', bookingSchema);

// module.exports = { Hotel, Booking };

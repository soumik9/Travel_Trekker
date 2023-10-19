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
exports.userRoles = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const validator_1 = __importDefault(require("validator"));
const constants_1 = require("../../utils/constants/constants");
const config_1 = __importDefault(require("../../utils/server/config"));
exports.userRoles = [constants_1.ENUM_USER_ROLE.ADMIN, constants_1.ENUM_USER_ROLE.SUPER_ADMIN, constants_1.ENUM_USER_ROLE.USER];
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Name filed is required']
    },
    image: String,
    email: {
        type: String,
        required: [true, 'Email filed is required'],
        // unique: true,
        validate: [validator_1.default.isEmail, 'Please provide a valid email.'],
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
            values: exports.userRoles,
            message: `Role value can not be {VALUE}, must be ${constants_1.ENUM_USER_ROLE.ADMIN}/${constants_1.ENUM_USER_ROLE.SUPER_ADMIN}/${constants_1.ENUM_USER_ROLE.USER}`
        }
    },
    services: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "Service"
        },
    ],
    reviews: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "Review"
        },
    ],
    orders: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "Order"
        },
    ],
}, { timestamps: true });
// checking is user exists
userSchema.methods.isUserExist = function (param) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield User.findOne({ email: param });
    });
};
// checking is password matched
userSchema.methods.isPasswordMatched = function (givenPassword, savedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(givenPassword, savedPassword);
    });
};
// create or save works for both
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password")) {
            return next();
        }
        const password = this.password;
        const hashedPassword = yield bcrypt_1.default.hashSync(password, Number(config_1.default.BYCRYPT_SALT_ROUND));
        this.password = hashedPassword;
        next();
    });
});
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
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

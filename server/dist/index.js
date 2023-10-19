"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = __importDefault(require("./app/routers/routes"));
const http_status_1 = __importDefault(require("http-status"));
const bootstrap_1 = __importDefault(require("./utils/server/bootstrap"));
const globalErrorHandler_1 = __importDefault(require("./utils/helpers/globalErrorHandler"));
const app = (0, express_1.default)();
//middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)("dev"));
// all routes
app.use('/api/v1', routes_1.default);
// files route
app.use('/public', express_1.default.static('public'));
//global error handler
app.use(globalErrorHandler_1.default);
//handle not found
app.use((req, res) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: 'Not Found',
        errorMessages: [
            {
                path: req.originalUrl,
                message: 'API Not Found',
            },
        ],
    });
});
// server related works
process.on('uncaughtException', error => {
    console.log(error, 'uncaughtException');
    process.exit(1);
});
let server;
(0, bootstrap_1.default)(app);
process.on('SIGTERM', () => {
    console.log('SIGTERM is received');
    if (server) {
        server.close();
    }
});

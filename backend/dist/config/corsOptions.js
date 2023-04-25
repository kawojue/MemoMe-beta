"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allowedOrigins = void 0;
exports.allowedOrigins = [
    'https://memome-one.vercel.app',
    "http://localhost:3000",
    'https://www.memome.one'
];
const corsOptions = {
    origin: (origin, callback) => {
        if (exports.allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
};
exports.default = corsOptions;

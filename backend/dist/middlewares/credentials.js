"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const corsOptions_1 = require("../config/corsOptions");
const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (corsOptions_1.allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', true);
        res.header("Access-Control-Allow-Origin", origin);
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    }
    next();
};
exports.default = credentials;

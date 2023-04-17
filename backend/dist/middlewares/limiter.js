"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
function limiterFunc({ max, timerArr, msg = "Too many requests sent." }) {
    const limiter = (0, express_rate_limit_1.default)({
        max,
        windowMs: timerArr[Math.floor(Math.random() * timerArr.length)] * 1000,
        message: {
            message: msg
        },
        handler: (req, res, next, options) => {
            res.status(options.statusCode).json({
                success: false,
                action: "warning",
                msg: options.message
            });
        },
        standardHeaders: true,
        legacyHeaders: false,
    });
    return limiter;
}
exports.default = limiterFunc;

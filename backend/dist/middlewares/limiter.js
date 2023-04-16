"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.msgLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const timerArr = [23, 32, 19, 52, 42]; // random sec
const limiter = (0, express_rate_limit_1.default)({
    max: 5,
    windowMs: timerArr[Math.floor(Math.random() * timerArr.length)] * 1000,
    message: {
        message: 'Too many attempts. Please, try again later.'
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
const msgTimerArr = [4, 5, 7];
exports.msgLimiter = (0, express_rate_limit_1.default)({
    max: 1,
    windowMs: msgTimerArr[Math.floor(Math.random() * msgTimerArr.length)] * 1000,
    message: {
        message: 'Duplicate Message Detected.'
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
exports.default = limiter;

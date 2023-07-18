"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const modal_1 = require("../utils/modal");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
function limiterFunc({ max, timerArr, msg = "Too many requests sent." }) {
    const limiter = (0, express_rate_limit_1.default)({
        max,
        windowMs: timerArr[Math.floor(Math.random() * timerArr.length)] * 1000,
        message: {
            message: msg
        },
        handler: (req, res, next, options) => {
            var _a;
            res.status(options.statusCode).json(Object.assign(Object.assign({}, modal_1.ERROR), { msg: (_a = options.message) === null || _a === void 0 ? void 0 : _a.message }));
        },
        standardHeaders: true,
        legacyHeaders: false,
    });
    return limiter;
}
exports.default = limiterFunc;

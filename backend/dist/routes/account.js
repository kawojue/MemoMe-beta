"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const limiter_1 = __importDefault(require("../middlewares/limiter"));
const auth_1 = require("../controllers/auth");
const jwtVerify_1 = __importDefault(require("../middlewares/jwtVerify"));
const accountRoute = express_1.default.Router();
const loginLimiter = {
    max: 5,
    timerArr: [23, 32, 19, 52, 42],
    msg: "Too many attempts. Please, try again later."
};
accountRoute.post('/signup', auth_1.createUser);
accountRoute.post('/edit', jwtVerify_1.default, auth_1.usernameHandler);
accountRoute.post('/login', (0, limiter_1.default)(loginLimiter), auth_1.login);
accountRoute.post('/req-otp', (0, limiter_1.default)({ max: 1, timerArr: [30, 60, 90] }), auth_1.otpHandler);
exports.default = accountRoute;

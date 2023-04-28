"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const limiter_1 = __importDefault(require("../../middlewares/limiter"));
const jwtVerify_1 = __importDefault(require("../../middlewares/jwtVerify"));
const settings_1 = require("../../controllers/settings");
const auth_1 = require("../../controllers/auth");
const passwordRoute = express_1.default.Router();
passwordRoute.post('/reset', auth_1.resetpswd);
passwordRoute.post('/change', jwtVerify_1.default, settings_1.editPswd);
passwordRoute.post('/verify', (0, limiter_1.default)({ max: 3, timerArr: [14, 9, 15] }), auth_1.verifyOTP);
exports.default = passwordRoute;

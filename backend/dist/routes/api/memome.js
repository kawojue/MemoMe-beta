"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const limiter_1 = require("../../middlewares/limiter");
const memome_1 = require("../../controllers/memome");
const apiRoute = express_1.default.Router();
apiRoute.route('/:user')
    .get(memome_1.countViews)
    .post(limiter_1.msgLimiter, memome_1.addMemo);
exports.default = apiRoute;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const limiter_1 = __importDefault(require("../middlewares/limiter"));
const auth_1 = require("../controllers/auth");
const accountRoute = express_1.default.Router();
accountRoute.post('/signup', auth_1.createUser);
accountRoute.post('/login', limiter_1.default, auth_1.login);
exports.default = accountRoute;

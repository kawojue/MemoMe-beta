"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwtVerify_1 = __importDefault(require("../../middlewares/jwtVerify"));
const settings_1 = require("../../controllers/settings");
const settingsRoute = express_1.default.Router();
settingsRoute.use(jwtVerify_1.default);
settingsRoute.post('/tg-msg', settings_1.toggleMessage);
settingsRoute.post('/tg-media', settings_1.togglePbMedia);
settingsRoute.post('/tg-content', settings_1.togglePbContent);
settingsRoute.post('/tg-disability', settings_1.toggleDisability);
exports.default = settingsRoute;

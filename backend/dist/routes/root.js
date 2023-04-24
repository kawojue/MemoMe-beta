"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const memome_1 = __importDefault(require("./api/memome"));
const account_1 = __importDefault(require("./account"));
const settings_1 = __importDefault(require("./api/settings"));
const jwtVerify_1 = __importDefault(require("../middlewares/jwtVerify"));
const memome_2 = require("../controllers/memome");
const express_1 = __importDefault(require("express"));
const rootRoute = express_1.default.Router();
rootRoute.use('/api', memome_1.default);
rootRoute.use('/account', account_1.default);
rootRoute.use('/settings', settings_1.default);
rootRoute.get('/profile', jwtVerify_1.default, memome_2.getMemos);
rootRoute.get('/', (req, res) => {
    res.status(200).send("MemoMe");
});
exports.default = rootRoute;

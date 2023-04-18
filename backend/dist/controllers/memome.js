"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMemos = exports.countViews = exports.addMemo = void 0;
const uuid_1 = require("uuid");
const UserModel_1 = __importDefault(require("../models/UserModel"));
const MemoMeModel_1 = __importDefault(require("../models/MemoMeModel"));
const textCrypt = require('text-encryption');
const asyncHandler = require('express-async-handler');
const addMemo = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    let { user } = req.params;
    let { content } = req.body;
    user = (_a = user === null || user === void 0 ? void 0 : user.toLowerCase()) === null || _a === void 0 ? void 0 : _a.trim();
    content = (_b = content === null || content === void 0 ? void 0 : content.toLowerCase()) === null || _b === void 0 ? void 0 : _b.trim();
    if (!user) {
        return res.status(400).json({
            success: false,
            action: "error",
            msg: "Invalid params"
        });
    }
    if (!content) {
        return res.status(400).json({
            success: false,
            action: "warning",
            msg: "Content cannot be blank"
        });
    }
    const account = yield UserModel_1.default.findOne({ user }).exec();
    if (!account) {
        return res.status(404).json({
            success: false,
            action: "error",
            msg: "User does not exist."
        });
    }
    const encryptContent = textCrypt.encrypt(content, process.env.STRING_KEY);
    if (account.body) {
        const memome = yield MemoMeModel_1.default.findOne({ user: account.id }).exec();
        memome.body = [...memome.body, {
                idx: (0, uuid_1.v4)(),
                content: encryptContent
            }];
        yield memome.save();
        return res.sendStatus(200);
    }
    yield MemoMeModel_1.default.create({
        user: account.id,
        body: [{
                idx: (0, uuid_1.v4)(),
                content: encryptContent
            }]
    });
    account.body = true;
    yield account.save();
    res.sendStatus(200);
}));
exports.addMemo = addMemo;
const countViews = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req.params;
    const account = yield UserModel_1.default.findOne({ user }).select('-password').exec();
    if (!account) {
        return res.status(404).json({
            success: false,
            action: "error",
            msg: "User does not exist."
        });
    }
    account.profileViews += 1;
    yield account.save();
    res.sendStatus(200);
}));
exports.countViews = countViews;
const getMemos = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const account = yield UserModel_1.default.findOne({ user: (_c = req.user) === null || _c === void 0 ? void 0 : _c.user })
        .select('-password -token').exec();
    if (!account) {
        return res.status(404).json({
            success: false,
            action: "error",
            msg: "Account not found"
        });
    }
    if (account.body === false) {
        return res.status(204).json({
            success: true,
            action: "success",
            body: []
        });
    }
    let memos = yield MemoMeModel_1.default.findOne({ user: account.id }).exec();
    if (!memos) {
        memos = [];
    }
    res.status(200).json({
        success: true,
        action: "success",
        body: {
            account,
            memos
        }
    });
}));
exports.getMemos = getMemos;

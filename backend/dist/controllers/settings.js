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
exports.toggleMessage = exports.togglePbContent = exports.togglePbMedia = exports.toggleDisability = exports.editPswd = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const asyncHandler = require('express-async-handler');
const editPswd = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { currentPswd, pswd, pswd2 } = req.body;
    if (!currentPswd) {
        return res.status(400).json({
            success: false,
            action: 'error',
            msg: 'Old password is required.'
        });
    }
    if (pswd !== pswd2) {
        return res.status(400).json({
            success: false,
            action: 'error',
            msg: 'Password does not match.'
        });
    }
    if (currentPswd === pswd === pswd2) {
        return res.status(400).json({
            success: false,
            action: 'warning',
            msg: 'Your Old and New Passowrds are matched.'
        });
    }
    const account = yield UserModel_1.default.findOne({ user: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.user }).exec();
    if (!account) {
        return res.status(404).json({
            success: false,
            action: 'error',
            msg: 'Something went wrong..'
        });
    }
    const isMatch = yield bcrypt_1.default.compare(currentPswd, account.password);
    if (!isMatch) {
        return res.status(401).json({
            success: false,
            action: 'error',
            msg: 'Incorrect password.'
        });
    }
    const salt = yield bcrypt_1.default.genSalt(10);
    const hashedPswd = yield bcrypt_1.default.hash(pswd, salt);
    account.password = hashedPswd;
    yield account.save();
    res.status(200).json({
        success: true,
        action: 'success',
        msg: 'Password changed successfully.'
    });
}));
exports.editPswd = editPswd;
const toggleDisability = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { tgDisability } = req.body;
    const account = yield UserModel_1.default.findOne({ user: (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.user }).exec();
    if (!account) {
        return res.status(404).json({
            success: false,
            action: 'error',
            msg: 'Something went wrong..'
        });
    }
    account.disabled = tgDisability;
    yield account.save();
    res.status(200).json({ success: true });
}));
exports.toggleDisability = toggleDisability;
const togglePbMedia = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const { tgPbMedia } = req.body;
    const account = yield UserModel_1.default.findOne({ user: (_c = req === null || req === void 0 ? void 0 : req.user) === null || _c === void 0 ? void 0 : _c.user }).exec();
    if (!account) {
        return res.status(404).json({
            success: false,
            action: 'error',
            msg: 'Something went wrong..'
        });
    }
    account.pbMedia = tgPbMedia;
    yield account.save();
    res.sendStatus(200);
}));
exports.togglePbMedia = togglePbMedia;
const togglePbContent = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const { tgPbContent } = req.body;
    const account = yield UserModel_1.default.findOne({ user: (_d = req === null || req === void 0 ? void 0 : req.user) === null || _d === void 0 ? void 0 : _d.user }).exec();
    if (!account) {
        return res.status(404).json({
            success: false,
            action: 'error',
            msg: 'Something went wrong..'
        });
    }
    account.pbContent = tgPbContent;
    yield account.save();
    res.sendStatus(200);
}));
exports.togglePbContent = togglePbContent;
const toggleMessage = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const { pbMsg } = req.body;
    if ((pbMsg === null || pbMsg === void 0 ? void 0 : pbMsg.length) > 50) {
        return res.status(400).json({
            success: false,
            action: 'warning',
            msg: 'Lmao..! Not saved!'
        });
    }
    const account = yield UserModel_1.default.findOne({ user: (_e = req === null || req === void 0 ? void 0 : req.user) === null || _e === void 0 ? void 0 : _e.user }).exec();
    if (!account) {
        return res.status(404).json({
            success: false,
            action: 'error',
            msg: 'Something went wrong..'
        });
    }
    account.pbMsg = pbMsg;
    yield account.save();
    res.sendStatus(200);
}));
exports.toggleMessage = toggleMessage;

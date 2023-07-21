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
exports.countViews = exports.getMemos = exports.getUser = exports.addMemo = void 0;
const uuid_1 = require("uuid");
const UserModel_1 = __importDefault(require("../models/UserModel"));
const MemoMeModel_1 = __importDefault(require("../models/MemoMeModel"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const textCrypt = require('text-encryption');
const asyncHandler = require('express-async-handler');
const modal_1 = require("../utils/modal");
const addMemo = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let mediaRes;
    let url;
    let encryptContent;
    let { user } = req.params;
    let { content, media, mediaType } = req.body;
    user = (_a = user === null || user === void 0 ? void 0 : user.toLowerCase()) === null || _a === void 0 ? void 0 : _a.trim();
    content = content === null || content === void 0 ? void 0 : content.trim();
    if (!user)
        return res.status(400).json(Object.assign(Object.assign({}, modal_1.ERROR), { msg: "Invalid params." }));
    if (!content && !media)
        return res.status(400).json(modal_1.CRED_BLANK);
    const account = yield UserModel_1.default.findOne({ user }).exec();
    if (!account)
        return res.status(404).json(Object.assign(Object.assign({}, modal_1.ERROR), { msg: "User does not exist." }));
    if (account.disabled)
        return res.status(400).json(Object.assign(Object.assign({}, modal_1.ERROR), { msg: "Account Disabled." }));
    if (media) {
        if (mediaType === "video") {
            mediaRes = yield cloudinary_1.default.uploader.upload(media, {
                folder: `MemoMe/${account.id}`,
                resource_type: 'video'
            });
        }
        if (mediaType === "image") {
            mediaRes = yield cloudinary_1.default.uploader.upload(media, {
                folder: `MemoMe/${account.id}`,
                resource_type: 'image'
            });
        }
        url = cloudinary_1.default.url(mediaRes.public_id, {
            attachment: true,
            download: true
        });
    }
    if (content)
        encryptContent = textCrypt.encrypt(content, process.env.STRING_KEY);
    if (account.body) {
        const memome = yield MemoMeModel_1.default.findOne({ user: account.id }).exec();
        memome.body = [...memome.body, {
                idx: (0, uuid_1.v4)(),
                content: encryptContent,
                time: `${new Date().toISOString()}`,
                media: {
                    public_id: mediaRes === null || mediaRes === void 0 ? void 0 : mediaRes.public_id,
                    secure_url: mediaRes === null || mediaRes === void 0 ? void 0 : mediaRes.secure_url,
                    public_url: url
                }
            }];
        yield memome.save();
        return res.sendStatus(200);
    }
    yield MemoMeModel_1.default.create({
        user: account.id,
        body: [{
                idx: (0, uuid_1.v4)(),
                content: encryptContent,
                time: `${new Date().toISOString()}`,
                media: {
                    public_id: mediaRes === null || mediaRes === void 0 ? void 0 : mediaRes.public_id,
                    secure_url: mediaRes === null || mediaRes === void 0 ? void 0 : mediaRes.secure_url,
                    public_url: url
                }
            }]
    });
    account.body = true;
    yield account.save();
    res.sendStatus(200);
}));
exports.addMemo = addMemo;
const getUser = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req.params;
    const account = yield UserModel_1.default.findOne({ user }).select('-password -token -OTP').exec();
    if (!account)
        return res.sendStatus(404);
    if (account.disabled)
        return res.sendStatus(401);
    if (!account.pbMedia && !account.pbContent) {
        return res.status(200).json({
            user,
            temporary: true,
            success: true,
            action: "success",
            msg: " has turned off to Recieve Text and Media."
        });
    }
    res.status(200).json({
        user,
        disabled: account.disabled,
        pbContent: account.pbContent,
        pbMedia: account.pbMedia,
        pbMsg: account.pbMsg
    });
}));
exports.getUser = getUser;
const countViews = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req.body;
    const account = yield UserModel_1.default.findOne({ user }).select('-password -OTP -token').exec();
    if (!account)
        return res.sendStatus(404);
    if (account.disabled)
        return res.sendStatus(400);
    if (!account.pbMedia && !account.pbContent) {
        account.profileViews += 1;
        yield account.save();
        return res.sendStatus(200);
    }
    account.profileViews += 1;
    yield account.save();
    res.sendStatus(200);
}));
exports.countViews = countViews;
const getMemos = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const account = yield UserModel_1.default.findOne({ user: (_b = req.user) === null || _b === void 0 ? void 0 : _b.user }).select('-password -token -OTP').exec();
    if (!account)
        return res.status(404).json(Object.assign(Object.assign({}, modal_1.ERROR), { msg: "Account not found." }));
    let memos = yield MemoMeModel_1.default.findOne({ user: account.id }).exec();
    if (!memos) {
        memos = {
            body: []
        };
    }
    if (account.body === false) {
        return res.status(200).json(Object.assign(Object.assign({}, modal_1.SUCCESS), { body: {
                account,
                memos: memos.body
            } }));
    }
    res.status(200).json(Object.assign(Object.assign({}, modal_1.SUCCESS), { body: {
            account,
            memos: memos.body.reverse()
        } }));
}));
exports.getMemos = getMemos;

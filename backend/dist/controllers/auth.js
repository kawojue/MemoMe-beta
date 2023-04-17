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
exports.usernameHandler = exports.otpHandler = exports.login = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const mailer_1 = __importDefault(require("../config/mailer"));
const genOTP_1 = __importDefault(require("../config/genOTP"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const checkMail_1 = __importDefault(require("../config/checkMail"));
const asyncHandler = require('express-async-handler');
// handle account creation
const createUser = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let { email, pswd, pswd2 } = req.body;
    email = (_a = email === null || email === void 0 ? void 0 : email.toLowerCase()) === null || _a === void 0 ? void 0 : _a.trim();
    const { valid, validators } = yield (0, checkMail_1.default)(email);
    if (!email || !pswd || !pswd2) {
        return res.status(400).json({
            success: false,
            action: "error",
            msg: "All fields are required."
        });
    }
    if (pswd !== pswd2) {
        return res.status(400).json({
            success: false,
            action: "warning",
            msg: "Passwords does not match."
        });
    }
    if (validators.regex.valid === false) {
        return res.status(400).json({
            success: false,
            action: "error",
            msg: "Email Regex is not valid."
        });
    }
    if (valid === false) {
        return res.status(400).json({
            success: false,
            action: "error",
            msg: validators.smtp.reason
        });
    }
    const user = email.split('@')[0];
    const account = yield UserModel_1.default.findOne({ 'mail.email': email }).exec();
    if (account) {
        return res.status(409).json({
            success: false,
            action: "warning",
            msg: "Account already exists."
        });
    }
    const salt = yield bcrypt_1.default.genSalt(10);
    pswd = yield bcrypt_1.default.hash(pswd, salt);
    yield UserModel_1.default.create({
        user,
        password: pswd,
        'mail.email': email,
    });
    res.status(201).json({
        success: true,
        action: "success",
        msg: "Account creation successful."
    });
}));
exports.createUser = createUser;
// handle Login
const login = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let { userId, pswd, lastLogin } = req.body;
    userId = (_b = userId === null || userId === void 0 ? void 0 : userId.toLowerCase()) === null || _b === void 0 ? void 0 : _b.trim();
    if (!userId || !pswd) {
        return res.status(400).json({
            success: false,
            action: "error",
            msg: "All fields are required."
        });
    }
    const account = yield UserModel_1.default.findOne(EMAIL_REGEX.test(userId) ?
        { 'mail.email': userId } : { user: userId }).exec();
    if (!account) {
        return res.status(400).json({
            success: false,
            action: "warning",
            msg: "Invalid User ID or Password."
        });
    }
    const match = yield bcrypt_1.default.compare(pswd, account.password);
    if (!match) {
        return res.status(401).json({
            success: false,
            action: "error",
            msg: "Incorrect password."
        });
    }
    const token = jsonwebtoken_1.default.sign({ "user": account.user }, process.env.JWT_SECRET, { expiresIn: '90d' });
    account.token = token;
    account.lastLogin = lastLogin;
    yield account.save();
    return res.status(200).json({
        token,
        success: true,
        action: "success",
        msg: "Login successful.",
    });
}));
exports.login = login;
// send otp to user
const otpHandler = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    let { email } = req.body;
    email = (_c = email === null || email === void 0 ? void 0 : email.trim()) === null || _c === void 0 ? void 0 : _c.toLowerCase();
    const { totp, totpDate } = (0, genOTP_1.default)();
    if (!email) {
        return res.status(400).json({
            success: false,
            action: "error",
            msg: "Invalid email"
        });
    }
    const account = yield UserModel_1.default.findOne({ 'mail.email': email }).exec();
    if (!account) {
        return res.status(400).json({
            success: false,
            action: "error",
            msg: "There is no account associated with this email."
        });
    }
    account.OTP.totp = totp;
    account.OTP.totpDate = totpDate;
    yield account.save();
    const transportMail = {
        senderName: "Kawojue Raheem - Admin",
        to: email,
        subject: "Verification Code",
        text: `Code: ${totp}`
    };
    yield (0, mailer_1.default)(transportMail);
    res.status(200).json({
        success: true,
        action: "success",
        msg: "OTP has been sent to your email."
    });
}));
exports.otpHandler = otpHandler;
// change username
const usernameHandler = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e;
    let { pswd, newUser } = req.body;
    newUser = (_d = newUser === null || newUser === void 0 ? void 0 : newUser.trim()) === null || _d === void 0 ? void 0 : _d.toLowerCase();
    if (!newUser || !pswd) {
        return res.status(400).json({
            success: false,
            action: "error",
            msg: "All fields are required"
        });
    }
    const account = yield UserModel_1.default.findOne({ user: (_e = req.user) === null || _e === void 0 ? void 0 : _e.user });
    if (!account) {
        return res.status(404).json({
            success: false,
            action: "error",
            msg: "Sorry, something went wrong. Try logging out then login."
        });
    }
    const userExists = yield UserModel_1.default.findOne({ user: newUser });
    if (userExists) {
        return res.status(409).json({
            success: false,
            action: "info",
            msg: "Username has been taken."
        });
    }
    const match = yield bcrypt_1.default.compare(pswd, account.password);
    if (!match) {
        return res.status(401).json({
            success: false,
            action: "error",
            msg: "Incorrect password."
        });
    }
    account.user = newUser;
    yield account.save();
    return res.status(200).json({
        success: true,
        action: "success",
        msg: "You've successfully changed your username."
    });
}));
exports.usernameHandler = usernameHandler;

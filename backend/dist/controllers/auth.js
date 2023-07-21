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
exports.editUsername = exports.resetpswd = exports.otpHandler = exports.verifyOTP = exports.logout = exports.login = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const mailer_1 = __importDefault(require("../utils/mailer"));
const genOTP_1 = __importDefault(require("../utils/genOTP"));
const modal_1 = require("../utils/modal");
const UserModel_1 = __importDefault(require("../models/UserModel"));
const randomstring_1 = __importDefault(require("randomstring"));
const genToken_1 = __importDefault(require("../utils/genToken"));
const asyncHandler = require('express-async-handler');
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{2,23}$/;
const restrictedUser = [
    "profile", "admin", "account",
    "api", "root", "wp-admin", "user",
    "id", "signup", "login", "edit",
    "password", "reset", "logout",
    "memome"
];
// handle account creation
const createUser = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    let user;
    let { email, pswd, pswd2 } = req.body;
    email = (_a = email === null || email === void 0 ? void 0 : email.toLowerCase()) === null || _a === void 0 ? void 0 : _a.trim();
    if (!email || !pswd || !pswd2)
        return res.status(400).json(modal_1.CRED_BLANK);
    if (pswd !== pswd2)
        return res.status(400).json(Object.assign(Object.assign({}, modal_1.ERROR), { msg: "Passwords does not match." }));
    if (!EMAIL_REGEX.test(email))
        return res.status(400).json(Object.assign(Object.assign({}, modal_1.ERROR), { msg: "Invalid Email." }));
    user = (_b = email === null || email === void 0 ? void 0 : email.split('@')[0]) === null || _b === void 0 ? void 0 : _b.toLowerCase();
    const account = yield UserModel_1.default.findOne({ 'mail.email': email }).exec();
    if (account)
        return res.status(409).json(Object.assign(Object.assign({}, modal_1.ERROR), { msg: "Account already exists." }));
    const isUserExists = yield UserModel_1.default.findOne({ user }).exec();
    if (!USER_REGEX.test(user) || isUserExists || restrictedUser.includes(user)) {
        const rand = randomstring_1.default.generate({
            length: parseInt('86759'[Math.floor(Math.random() * 5)]),
            charset: 'alphabetic'
        });
        user = (_c = rand === null || rand === void 0 ? void 0 : rand.toLowerCase()) === null || _c === void 0 ? void 0 : _c.trim();
    }
    const salt = yield bcrypt_1.default.genSalt(10);
    pswd = yield bcrypt_1.default.hash(pswd, salt);
    yield UserModel_1.default.create({
        user,
        password: pswd,
        'mail.email': email,
        createdAt: `${new Date()}`
    });
    res.status(201).json(Object.assign(Object.assign({}, modal_1.SUCCESS), { msg: "Account creation was successful." }));
}));
exports.createUser = createUser;
// handle Login
const login = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    let { userId, pswd } = req.body;
    userId = (_d = userId === null || userId === void 0 ? void 0 : userId.toLowerCase()) === null || _d === void 0 ? void 0 : _d.trim();
    if (!userId || !pswd)
        return res.status(400).json(modal_1.CRED_BLANK);
    const account = yield UserModel_1.default.findOne(EMAIL_REGEX.test(userId) ?
        { 'mail.email': userId } : { user: userId }).exec();
    if (!account)
        return res.status(400).json(Object.assign(Object.assign({}, modal_1.ERROR), { msg: "Invalid User ID or Password." }));
    const match = yield bcrypt_1.default.compare(pswd, account.password);
    if (!match)
        return res.status(401).json(modal_1.INC_PSWD);
    const token = (0, genToken_1.default)(account.user);
    account.token = token;
    account.lastLogin = `${new Date()}`;
    yield account.save();
    res.status(200).json(Object.assign(Object.assign({ token, toggles: {
            disabled: account.disabled,
            pbMedia: account.pbMedia,
            pbContent: account.pbContent
        } }, modal_1.SUCCESS), { msg: "Login successful." }));
}));
exports.login = login;
// send otp to user
const otpHandler = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    let { email } = req.body;
    email = (_e = email === null || email === void 0 ? void 0 : email.trim()) === null || _e === void 0 ? void 0 : _e.toLowerCase();
    const { totp, totpDate } = (0, genOTP_1.default)();
    if (!email)
        return res.status(400).json(Object.assign(Object.assign({}, modal_1.ERROR), { msg: "Invalid email." }));
    const account = yield UserModel_1.default.findOne({ 'mail.email': email }).exec();
    if (!account)
        return res.status(400).json(Object.assign(Object.assign({}, modal_1.ERROR), { msg: "There is no account associated with this email." }));
    account.OTP.totp = totp;
    account.OTP.totpDate = totpDate;
    account.mail.verified = false;
    yield account.save();
    const transportMail = {
        senderName: "Muyiwa at MemoMe",
        to: email,
        subject: "Verification Code",
        text: `Code: ${totp}\nIf you did not request for this OTP. Please, ignore.`
    };
    yield (0, mailer_1.default)(transportMail);
    res.status(200).json(Object.assign(Object.assign({}, modal_1.SUCCESS), { msg: "OTP has been sent to your email." }));
}));
exports.otpHandler = otpHandler;
// change username
const editUsername = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f, _g;
    let { newUser } = req.body;
    newUser = (_f = newUser === null || newUser === void 0 ? void 0 : newUser.trim()) === null || _f === void 0 ? void 0 : _f.toLowerCase();
    if (!newUser)
        return res.status(400).json(modal_1.CRED_BLANK);
    if (restrictedUser.includes(newUser) || !USER_REGEX.test(newUser))
        return res.status(400).json(Object.assign(Object.assign({}, modal_1.ERROR), { msg: "Username is not allowed." }));
    const account = yield UserModel_1.default.findOne({ user: (_g = req.user) === null || _g === void 0 ? void 0 : _g.user }).exec();
    if (!account)
        return res.status(404).json(modal_1.SMTH_WRONG);
    const userExists = yield UserModel_1.default.findOne({ user: newUser }).exec();
    if (userExists)
        return res.status(409).json(Object.assign(Object.assign({}, modal_1.ERROR), { msg: "Username has been taken." }));
    account.token = "";
    account.user = newUser;
    yield account.save();
    res.status(200).json(Object.assign(Object.assign({}, modal_1.SUCCESS), { msg: "You've successfully changed your username." }));
}));
exports.editUsername = editUsername;
const logout = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _h;
    const authHeader = (_h = req.headers) === null || _h === void 0 ? void 0 : _h.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer'))
        return res.sendStatus(204);
    const token = authHeader.split(' ')[1];
    const account = yield UserModel_1.default.findOne({ token }).exec();
    if (!account)
        return res.sendStatus(204);
    account.token = "";
    yield account.save();
    res.sendStatus(204);
}));
exports.logout = logout;
// verify OTP
const verifyOTP = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { otp, email } = req.body;
    if (!otp || !email)
        return res.status(400).json(modal_1.CRED_BLANK);
    const account = yield UserModel_1.default.findOne({ 'mail.email': email }).exec();
    const totp = account.OTP.totp;
    const totpDate = account.OTP.totpDate;
    const expiry = totpDate + (60 * 60 * 1000); // after 1hr
    if (expiry < Date.now()) {
        account.OTP = {};
        yield account.save();
        return res.status(400).json(Object.assign(Object.assign({}, modal_1.ERROR), { msg: "OTP Expired." }));
    }
    if (totp !== otp)
        return res.status(401).json(Object.assign(Object.assign({}, modal_1.ERROR), { msg: "Incorrect OTP." }));
    account.OTP = {};
    account.mail.verified = true;
    yield account.save();
    res.status(200).json({ email, verified: true, user: account.user });
}));
exports.verifyOTP = verifyOTP;
// reset password
const resetpswd = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { verified, email, newPswd, newPswd2 } = req.body;
    if (!email || !newPswd)
        return res.status(400).json(modal_1.CRED_BLANK);
    if (newPswd !== newPswd2)
        return res.status(400).json(Object.assign(Object.assign({}, modal_1.ERROR), { msg: "Password does not match." }));
    const account = yield UserModel_1.default.findOne({ 'mail.email': email }).exec();
    if (!account)
        return res.status(404).json(Object.assign(Object.assign({}, modal_1.ERROR), { msg: "Account does not exist." }));
    if (!verified || !account.mail.verified)
        return res.status(400).json(modal_1.ACCESS_DENIED);
    const compare = yield bcrypt_1.default.compare(newPswd, account.password);
    if (compare)
        return res.status(400).json(Object.assign(Object.assign({}, modal_1.ERROR), { msg: "You input your current password." }));
    const salt = yield bcrypt_1.default.genSalt(10);
    const hasedPswd = yield bcrypt_1.default.hash(newPswd, salt);
    account.token = "";
    account.password = hasedPswd;
    account.mail.verified = false;
    yield account.save();
    res.status(200).json(Object.assign(Object.assign({}, modal_1.SUCCESS), { msg: "Password updated successfully." }));
}));
exports.resetpswd = resetpswd;

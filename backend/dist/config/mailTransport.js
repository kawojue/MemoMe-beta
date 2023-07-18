"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const nodemailer_1 = require("nodemailer");
dotenv_1.default.config();
const transporter = (0, nodemailer_1.createTransport)({
    host: 'smtp.gmail.com',
    secure: true,
    service: 'gmail',
    requireTLS: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PSWD
    }
});
exports.default = transporter;

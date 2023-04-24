"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const userSchema = new mongoose_1.Schema({
    user: {
        type: String,
        required: true,
        unique: true,
        sparse: true,
    },
    mail: {
        email: {
            type: String,
            unique: true,
            sparse: true,
        },
        verified: {
            type: Boolean,
            default: false
        }
    },
    password: {
        type: String,
        required: true
    },
    token: String,
    lastLogin: String,
    createdAt: String,
    profileViews: {
        type: Number,
        default: 0
    },
    body: {
        type: Boolean,
        default: false
    },
    OTP: {
        totp: String,
        totpDate: Number
    },
    disabled: {
        type: Boolean,
        default: false
    },
    pbContent: {
        type: Boolean,
        default: true
    },
    pbMedia: {
        type: Boolean,
        default: true
    },
    pbMsg: {
        type: String,
        default: "Tell me what is on your mind?"
    }
});
exports.default = mongoose_1.default.model("User", userSchema);

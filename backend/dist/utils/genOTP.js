"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function generateOTP() {
    let totp = '';
    const totpDate = Date.now();
    const digits = '0918273645';
    const length = parseInt('65'[Math.floor(Math.random() * 2)]);
    for (let i = 0; i < length; i++) {
        totp += digits[Math.floor(Math.random() * length)];
    }
    return { totp, totpDate };
}
exports.default = generateOTP;

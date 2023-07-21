"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INC_PSWD = exports.CRED_BLANK = exports.SMTH_WRONG = exports.ACCESS_DENIED = exports.SUCCESS = exports.ERROR = void 0;
const ERROR = {
    success: false,
    action: 'error',
};
exports.ERROR = ERROR;
const SUCCESS = {
    success: true,
    action: 'success'
};
exports.SUCCESS = SUCCESS;
const ACCESS_DENIED = Object.assign(Object.assign({}, ERROR), { msg: 'Access Denied.' });
exports.ACCESS_DENIED = ACCESS_DENIED;
const SMTH_WRONG = Object.assign(Object.assign({}, ERROR), { msg: 'Sorry, something went wrong.' });
exports.SMTH_WRONG = SMTH_WRONG;
const CRED_BLANK = Object.assign(Object.assign({}, ERROR), { msg: 'Credentials cannot be blank.' });
exports.CRED_BLANK = CRED_BLANK;
const INC_PSWD = Object.assign(Object.assign({}, ERROR), { msg: 'Incorrect Password.' });
exports.INC_PSWD = INC_PSWD;

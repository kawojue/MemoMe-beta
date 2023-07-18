"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACCESS_DENIED = exports.SUCCESS = exports.ERROR = void 0;
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

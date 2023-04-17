"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth0Config = void 0;
exports.auth0Config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.JWT_SECRET,
    baseURL: 'http://localhost:1707',
    clientID: process.env.AUTH_CLIENT_ID,
    issuerBaseURL: 'https://dev-r80r0y5b5nhd8ca2.us.auth0.com'
};

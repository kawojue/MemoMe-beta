import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { IRequest } from '../type'
import User from '../models/UserModel'
import { ACCESS_DENIED } from '../utils/modal'
import { Response, NextFunction } from 'express'
const asyncHandler = require('express-async-handler')

dotenv.config()

const jwtVerify = asyncHandler(async (req: IRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers?.authorization
    if (!authHeader?.startsWith('Bearer')) return res.status(401).json(ACCESS_DENIED)

    const token: string = authHeader.split(' ')[1]
    jwt.verify(
        token,
        process.env.JWT_SECRET,
        async (err: any, decoded: any) => {
            if (err) return res.status(403).json(ACCESS_DENIED)

            req.user = await User.findOne({ user: decoded.user }).select('-password').exec()
            next()
        }
    )
})

export default jwtVerify
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import User from '../models/UserModel'
import { Request, Response, NextFunction } from 'express'
const asyncHandler = require('express-async-handler')

dotenv.config()

interface IRequest extends Request {
    user: any
}

const jwtVerify = asyncHandler(async (req: IRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers?.authorization

    if (!authHeader?.startsWith('Bearer')) {
        return res.status(401).json({
            success: false,
            action: "error",
            msg: "Not accessible."
        })
    }

    const token: string = authHeader.split(' ')[1]
    jwt.verify(
        token,
        process.env.JWT_SECRET as string,
        async (err: any, decoded: any) => {
            if (err) {
                return res.status(403).json({
                    success: false,
                    action: "error",
                    msg: "Forbidden"
                })
            }
            req.user = await User.findOne({ user: decoded.user }).select('-password').exec()
            next()
        }
    )
})

export default jwtVerify
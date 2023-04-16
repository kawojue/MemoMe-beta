import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import User from '../models/UserModel'
import { Response, NextFunction } from 'express'
const asyncHandler = require('express-async-handler')

dotenv.config()

const jwtVerify = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const authHeader = req.headers?.authorization

    if (!authHeader?.startsWith('Bearer')) {
        return res.status(401).json({
            success: false,
            action: "warning",
            msg: "Not accessible."
        })
    }

    const token: string = authHeader.split(' ')[1]
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string)

    console.log(decoded)

    if (!decoded) {
        return res.status(403).json({
            success: false,
            action: "error",
            msg: "Forbidden"
        })
    }

    req.user = await User.findOne({ user: decoded.user }).select('-password').exec()
    next()
})

export default jwtVerify
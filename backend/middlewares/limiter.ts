import { Request, Response, NextFunction } from 'express'
import rateLimit, { RateLimitRequestHandler, Options } from 'express-rate-limit'

const timerArr: number[] = [23, 32, 19, 52, 42] // random sec

const limiter: RateLimitRequestHandler = rateLimit({
    max: 5, // max attempt
    windowMs: timerArr[Math.floor(Math.random() * timerArr.length)] * 1000, // try again in
    message: {
        message: 'Too many attempts. Please, try again later.'
    },
    handler: (req: Request, res: Response, next: NextFunction, options: Options) => {
        res.status(options.statusCode).json({
            success: false,
            action: "warning",
            msg: options.message
        })
    },
    standardHeaders: true,
    legacyHeaders: false,
})

const msgTimerArr = [4, 5, 7]
export const msgLimiter: RateLimitRequestHandler = rateLimit({
    max: 1, // max attempt
    windowMs: msgTimerArr[Math.floor(Math.random() * msgTimerArr.length)] * 1000, // try again in
    message: {
        message: 'Too much requests sent.'
    },
    handler: (req: Request, res: Response, next: NextFunction, options: Options) => {
        res.status(options.statusCode).json({
            success: false,
            action: "warning",
            msg: options.message
        })
    },
    standardHeaders: true,
    legacyHeaders: false,
})

const otpTimerArr = [30, 60, 90]
export const otpLimiter: RateLimitRequestHandler = rateLimit({
    max: 1, // max attempt
    windowMs: otpTimerArr[Math.floor(Math.random() * otpTimerArr.length)] * 1000, // try again in
    message: {
        message: 'Too much requests sent.'
    },
    handler: (req: Request, res: Response, next: NextFunction, options: Options) => {
        res.status(options.statusCode).json({
            success: false,
            action: "warning",
            msg: options.message
        })
    },
    standardHeaders: true,
    legacyHeaders: false,
})

export default limiter
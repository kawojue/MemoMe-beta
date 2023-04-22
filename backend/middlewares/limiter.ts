import { ILimiter } from '../type'
import { Request, Response, NextFunction } from 'express'
import rateLimit, { RateLimitRequestHandler, Options } from 'express-rate-limit'

export default function limiterFunc({ max, timerArr, msg = "Too many requests sent." }: ILimiter): RateLimitRequestHandler {
    const limiter: RateLimitRequestHandler = rateLimit({
        max, // max attempt
        windowMs: timerArr[Math.floor(Math.random() * timerArr.length)] * 1000, // try again in
        message: {
            message: msg
        },
        handler: (req: Request, res: Response, next: NextFunction, options: Options) => {
            res.status(options.statusCode).json({
                success: false,
                action: "warning",
                msg: options.message?.message
            })
        },
        standardHeaders: true,
        legacyHeaders: false,
    })

    return limiter
}
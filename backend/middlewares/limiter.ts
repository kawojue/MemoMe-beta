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

export default limiter
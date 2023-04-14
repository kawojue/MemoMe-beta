import { Request, Response, NextFunction } from 'express'

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    const statusCode = res.statusCode ? res.statusCode : 500

    res.status(statusCode).json({
        success: false,
        action: "error",
        msg: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

export default errorHandler
import { Request, NextFunction } from "express"
import { allowedOrigins } from "../config/corsOptions"

const credentials = (req: Request, res: any, next: NextFunction) => {
    const origin = req.headers.origin
    if (allowedOrigins.includes(origin as string)) {
        res.header('Access-Control-Allow-Credentials', true)
    }
    next()
}

export default credentials
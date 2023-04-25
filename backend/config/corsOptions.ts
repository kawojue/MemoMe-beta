import { CorsOptions } from 'cors'

export const allowedOrigins: string[] = [
    "http://localhost:3000",
    "https://memome-one.vercel.app"
]

const corsOptions: CorsOptions = {
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin as string) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

export default corsOptions
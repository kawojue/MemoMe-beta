import { CorsOptions } from 'cors'

export const allowedOrigins: string[] = [
    "http://localhost:3000",
    "https://memome-beta.vercel.app"
]

const corsOptions: CorsOptions = {
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ["GET", "POST", "PUT", "DELETE"],
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin as string) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

export default corsOptions
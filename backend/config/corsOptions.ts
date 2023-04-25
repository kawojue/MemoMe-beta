import { CorsOptions } from 'cors'

export const allowedOrigins: string[] = [
    'https://memome-one.vercel.app',
    "http://localhost:3000",
    'https://www.memome.one'
]

const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin as string) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
}

export default corsOptions
import dotenv from 'dotenv'
dotenv.config()

import cors from 'cors'
import morgan from 'morgan'
import mongoose from 'mongoose'
import dbCOnn from './config/DBConn'
import corsOptions from './config/corsOptions'
import express, { Application, Response, Request } from 'express'

// import routes
import accountRoute from './routes/account'

const app: Application = express()
const PORT = process.env.PORT || 1707

dbCOnn(process.env.DB_URI as string)

// set middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: false }))

// set routes
app.use('/account', accountRoute)

app.get('/', (req: Request, res: Response) => {
    res.status(200).send("MemoMe")
})

mongoose.connection.once('open', () => {
    console.log("Connect to MongoDB!")
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`)
    })
})
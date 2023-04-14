import dotenv from 'dotenv'
dotenv.config()

import cors from 'cors'
import mongoose from 'mongoose'
import dbCOnn from './config/DBConn'
import corsOptions from './config/corsOptions'
import express, { Application, Response, Request } from 'express'

const app: Application = express()
const PORT = process.env.PORT || 1707

dbCOnn(process.env.DB_URI as string)

// set middlewares
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req: Request, res: Response) => {
    res.status(200).send("MemoMe")
})

mongoose.connection.once('open', () => {
    console.log("Connect to MongoDB!")
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`)
    })
})
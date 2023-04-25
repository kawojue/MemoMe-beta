import dotenv from 'dotenv'
dotenv.config()

import cors from 'cors'
import logger from 'morgan'
import mongoose from 'mongoose'
import DBConn from './config/DBConn'
import rootRoute from './routes/root'
import credentials from './middlewares/credentials'
import corsOptions from './config/corsOptions'
import express, { Application } from 'express'

const app: Application = express()
const PORT = process.env.PORT || 1707

DBConn(process.env.DB_URI as string)

// set middlewares
app.use(credentials)
app.use(express.json({ limit: '10mb'}))
app.use(logger('dev'))
app.use(cors(corsOptions))
app.use(express.urlencoded({ limit: '10mb', extended: true }))

// set route
app.use('/', rootRoute)

mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB!")
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`)
    })
})
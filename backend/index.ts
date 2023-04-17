import dotenv from 'dotenv'
dotenv.config()

import cors from 'cors'
import morgan from 'morgan'
import mongoose from 'mongoose'
import DBConn from './config/DBConn'
import rootRoute from './routes/root'
import corsOptions from './config/corsOptions'
const { auth } = require('express-openid-connect')
import express, { Application } from 'express'
import { auth0Config } from './config/auth0Config'

const app: Application = express()
const PORT = process.env.PORT || 1707

DBConn(process.env.DB_URI as string)

// set middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(cors(corsOptions))
// app.use(auth(auth0Config))
app.use(express.urlencoded({ extended: false }))



// set route
app.use('/', rootRoute)

mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB!")
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`)
    })
})
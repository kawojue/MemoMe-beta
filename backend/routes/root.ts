import apiRoute from './api/memome'
import accountRoute from './account'
import express, { Router, Request, Response } from 'express'

const rootRoute: Router = express.Router()

rootRoute.use('/api', apiRoute)
rootRoute.use('/account', accountRoute)

rootRoute.get('/', (req: Request, res: Response) => {
    res.status(200).send("MemoMe")
})

export default rootRoute
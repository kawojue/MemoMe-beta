import apiRoute from './api/memome'
import accountRoute from './account'
import settingsRoute from './api/settings'
import jwtVerify from '../middlewares/jwtVerify'
import { getMemos } from '../controllers/memome'
import express, { Router, Request, Response } from 'express'

const rootRoute: Router = express.Router()

rootRoute.use('/api', apiRoute)
rootRoute.use('/account', accountRoute)
rootRoute.use('/settings', settingsRoute)

rootRoute.get('/profile', jwtVerify, getMemos)

rootRoute.get('/', (req: Request, res: Response) => {
    res.status(200).send("MemoMe")
})

export default rootRoute